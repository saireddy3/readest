import { useCallback, useEffect, useRef, useState } from 'react';

export const useLongPress = ({
  onTap,
  onLongPress,
  onContextMenu,
  onCancel,
  threshold = 500,
  moveThreshold = 10,
}) => {
  const [pressing, setPressing] = useState(false);
  const timerRef = useRef();
  const startPosRef = useRef(null);
  const pointerId = useRef(null);
  const isLongPressTriggered = useRef(false);

  const reset = useCallback(() => {
    setPressing(false);
    isLongPressTriggered.current = false;
    startPosRef.current = null;
    pointerId.current = null;
    clearTimeout(timerRef.current);
  }, []);

  const handlePointerDown = useCallback(
    (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) {
        return;
      }

      pointerId.current = e.pointerId;
      startPosRef.current = { x: e.clientX, y: e.clientY };
      isLongPressTriggered.current = false;
      setPressing(true);

      timerRef.current = setTimeout(() => {
        if (startPosRef.current) {
          isLongPressTriggered.current = true;
          onLongPress?.();
          setPressing(false);
        }
      }, threshold);
    },
    [onLongPress, threshold],
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (e.pointerId !== pointerId.current || !startPosRef.current) return;

      const deltaX = Math.abs(e.clientX - startPosRef.current.x);
      const deltaY = Math.abs(e.clientY - startPosRef.current.y);

      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        onCancel?.();
        reset();
      }
    },
    [moveThreshold, onCancel, reset],
  );

  const handlePointerUp = useCallback(
    (e) => {
      if (e.pointerId !== pointerId.current) return;

      if (!isLongPressTriggered.current && startPosRef.current) {
        const deltaX = Math.abs(e.clientX - startPosRef.current.x);
        const deltaY = Math.abs(e.clientY - startPosRef.current.y);

        if (deltaX <= moveThreshold && deltaY <= moveThreshold) {
          onTap?.();
        }
      }

      reset();
    },
    [onTap, moveThreshold, reset],
  );

  const handleCancel = useCallback(
    (e) => {
      if (e.pointerId !== pointerId.current) return;
      onCancel?.();
      reset();
    },
    [onCancel, reset],
  );

  const handleContextMenu = useCallback(
    (e) => {
      if (onContextMenu) {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu();
      }
    },
    [onContextMenu],
  );

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return {
    pressing,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerMove: handlePointerMove,
      onPointerCancel: handleCancel,
      onPointerLeave: handleCancel,
      onContextMenu: handleContextMenu,
    },
  };
}; 