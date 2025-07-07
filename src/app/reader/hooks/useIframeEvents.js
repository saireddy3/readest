import { useEffect } from 'react';
import { useReaderStore } from '../../../store/readerStore';

import { eventDispatcher } from '../../../utils/event';

export const useClickEvent = (bookKey, viewRef, containerRef) => {
  const { getViewSettings } = useReaderStore();
  const { hoveredBookKey, setHoveredBookKey } = useReaderStore();
  const handleTurnPage = async (msg) => {
    if (msg instanceof MessageEvent) {
      if (msg.data && msg.data.bookKey === bookKey) {
        const viewSettings = getViewSettings(bookKey);
        if (msg.data.type === 'iframe-single-click') {
          const viewElement = containerRef.current;
          if (viewElement) {
            const { screenX } = msg.data;
            const viewRect = viewElement.getBoundingClientRect();
            const windowStartX = window.screenX;
            const viewStartX = windowStartX + viewRect.left;
            const viewCenterX = viewStartX + viewRect.width / 2;
            const consumed = eventDispatcher.dispatchSync('iframe-single-click');
            if (!consumed) {
              const centerStartX = viewStartX + viewRect.width * 0.375;
              const centerEndX = viewStartX + viewRect.width * 0.625;
              if (
                viewSettings.disableClick ||
                (screenX >= centerStartX && screenX <= centerEndX)
              ) {
                // toggle visibility of the header bar and the footer bar
                setHoveredBookKey(hoveredBookKey ? null : bookKey);
              } else {
                if (hoveredBookKey) {
                  setHoveredBookKey(null);
                }
                if (!viewSettings.disableClick && screenX >= viewCenterX) {
                  if (viewSettings.swapClickArea) {
                    viewRef.current?.goLeft();
                  } else {
                    viewRef.current?.goRight();
                  }
                } else if (!viewSettings.disableClick && screenX < viewCenterX) {
                  if (viewSettings.swapClickArea) {
                    viewRef.current?.goRight();
                  } else {
                    viewRef.current?.goLeft();
                  }
                }
              }
            }
          }
        } else if (msg.data.type === 'iframe-wheel' && !viewSettings.scrolled) {
          // The wheel event is handled by the iframe itself in scrolled mode.
          const { deltaY } = msg.data;
          if (deltaY > 0) {
            viewRef.current?.next(1);
          } else if (deltaY < 0) {
            viewRef.current?.prev(1);
          }
        } else if (msg.data.type === 'iframe-mouseup') {
          if (msg.data.button === 3) {
            viewRef.current?.history.back();
          } else if (msg.data.button === 4) {
            viewRef.current?.history.forward();
          }
        }
      }
    } else {
      const { clientX } = msg;
      const width = window.innerWidth;
      const leftThreshold = width * 0.5;
      const rightThreshold = width * 0.5;
      if (clientX < leftThreshold) {
        viewRef.current?.goLeft();
      } else if (clientX > rightThreshold) {
        viewRef.current?.goRight();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleTurnPage);
    return () => {
      window.removeEventListener('message', handleTurnPage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredBookKey, viewRef]);

  return {
    handleTurnPage,
  };
};

export const useTouchEvent = (bookKey, viewRef) => {
  const { hoveredBookKey, setHoveredBookKey, getViewSettings } = useReaderStore();
  const viewSettings = getViewSettings(bookKey);

  let touchStart = null;
  let touchEnd = null;

  const onTouchStart = (e) => {
    touchEnd = null;
    const touch = e.targetTouches[0];
    if (!touch) return;
    touchStart = touch;
  };

  const onTouchMove = (e) => {
    if (!touchStart) return;
    const touch = e.targetTouches[0];
    if (touch) {
      touchEnd = touch;
    }
    if (hoveredBookKey && touchEnd) {
      const deltaY = touchEnd.screenY - touchStart.screenY;
      const deltaX = touchEnd.screenX - touchStart.screenX;
      if (!viewSettings.scrolled && !viewSettings.vertical) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          setHoveredBookKey(null);
        }
      } else {
        setHoveredBookKey(null);
      }
    }
  };

  const onTouchEnd = (e) => {
    if (!touchStart) return;

    const touch = e.targetTouches[0];
    if (touch) {
      touchEnd = touch;
    }

    const windowWidth = window.innerWidth;
    if (touchEnd) {
      const deltaY = touchEnd.screenY - touchStart.screenY;
      const deltaX = touchEnd.screenX - touchStart.screenX;
      // also check for deltaX to prevent swipe page turn from triggering the toggle
      if (
        deltaY < -10 &&
        Math.abs(deltaY) > Math.abs(deltaX) &&
        Math.abs(deltaX) < windowWidth * 0.3
      ) {
        // swipe up to toggle the header bar and the footer bar, only for horizontal page mode
        if (!viewSettings.scrolled && !viewSettings.vertical) {
          setHoveredBookKey(hoveredBookKey ? null : bookKey);
        }
      } else {
        if (hoveredBookKey) {
          setHoveredBookKey(null);
        }
      }
    }

    touchStart = null;
    touchEnd = null;
  };

  const handleTouch = (msg) => {
    if (msg.data && msg.data.bookKey === bookKey) {
      if (msg.data.type === 'iframe-touchstart') {
        onTouchStart(msg.data);
      } else if (msg.data.type === 'iframe-touchmove') {
        onTouchMove(msg.data);
      } else if (msg.data.type === 'iframe-touchend') {
        onTouchEnd(msg.data);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleTouch);
    return () => {
      window.removeEventListener('message', handleTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredBookKey, viewRef]);
}; 