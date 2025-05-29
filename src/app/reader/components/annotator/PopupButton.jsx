import React, { useState } from 'react';

const PopupButton = ({ showTooltip, tooltipText, Icon, onClick }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick = () => {
    setButtonClicked(true);
    onClick();
  };
  return (
    <div
      className='lg:tooltip lg:tooltip-bottom'
      data-tip={!buttonClicked && showTooltip ? tooltipText : null}
    >
      <button
        onClick={handleClick}
        className='flex h-8 min-h-8 w-8 items-center justify-center p-0'
      >
        <Icon />
      </button>
    </div>
  );
};

export default PopupButton; 