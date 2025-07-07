import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { eventDispatcher } from '../../../utils/event';

const HintInfo = ({
  bookKey,
  showDoubleBorder,
  isVertical,
  horizontalGap,
  verticalMargin,
}) => {
  const [hintMessage, setHintMessage] = React.useState(null);
  const hintTimeout = useRef(2000);
  const dismissTimeout = useRef(null);

  const handleShowHint = (event) => {
    const { message, bookKey: hintBookKey, timeout = 2000 } = event.detail;
    if (hintBookKey !== bookKey) return;
    setHintMessage(message);
    hintTimeout.current = timeout;
  };

  useEffect(() => {
    eventDispatcher.on('hint', handleShowHint);
    return () => {
      eventDispatcher.off('hint', handleShowHint);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
    dismissTimeout.current = setTimeout(() => setHintMessage(''), hintTimeout.current);
    return () => {
      if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
    };
  }, [hintMessage]);

  return (
    <div
      className={clsx(
        'hintinfo absolute flex items-center justify-end overflow-hidden',
        hintMessage ? 'bg-base-100' : 'bg-transparent',
        isVertical ? 'writing-vertical-rl max-h-[50%]' : 'top-0 h-[44px] max-w-[50%]',
      )}
      style={
        isVertical
          ? {
              bottom: `${verticalMargin * 1.5}px`,
              left: `calc(100% - ${horizontalGap}%)`,
              width: showDoubleBorder ? '30px' : `${horizontalGap}%`,
            }
          : { insetInlineEnd: `${horizontalGap}%` }
      }
    >
      <h2 className={clsx('text-neutral-content text-center font-sans text-xs font-light')}>
        {hintMessage || ''}
      </h2>
    </div>
  );
};

export default HintInfo; 