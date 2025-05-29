import clsx from 'clsx';
import React, { useState, isValidElement } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  className,
  menuClassName,
  buttonClassName,
  toggleButton,
  children,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  const setIsDropdownOpen = (isOpen) => {
    setIsOpen(isOpen);
    onToggle?.(isOpen);
  };

  const childrenWithToggle = isValidElement(children)
    ? React.cloneElement(children, { setIsDropdownOpen, menuClassName })
    : children;

  return (
    <div className='dropdown-container'>
      {isOpen && (
        <div className='fixed inset-0 bg-transparent' onClick={() => setIsDropdownOpen(false)} />
      )}
      <div className={clsx('dropdown', className)}>
        <div
          tabIndex={-1}
          onClick={toggleDropdown}
          className={clsx('dropdown-toggle', buttonClassName, isOpen && 'bg-base-300/50')}
        >
          {toggleButton}
        </div>
        {isOpen && childrenWithToggle}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  menuClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  toggleButton: PropTypes.node.isRequired,
  children: PropTypes.element.isRequired,
  onToggle: PropTypes.func,
};

export default Dropdown; 