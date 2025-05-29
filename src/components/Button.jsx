import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Button = ({
  icon,
  onClick,
  disabled = false,
  tooltip,
  tooltipDirection = 'top',
  className,
}) => {
  return (
    <div
      className={clsx(
        'lg:tooltip z-50 h-8 min-h-8 w-8',
        tooltip && `lg:tooltip-${tooltipDirection}`,
        {
          'tooltip-hidden': !tooltip,
        },
      )}
      data-tip={tooltip}
    >
      <button
        className={clsx(
          'btn btn-ghost h-8 min-h-8 w-8 p-0',
          disabled && 'btn-disabled !bg-transparent',
          className,
        )}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {icon}
      </button>
    </div>
  );
};

Button.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  tooltipDirection: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  className: PropTypes.string,
};

export default Button; 