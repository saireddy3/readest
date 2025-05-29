import React from 'react';
import PropTypes from 'prop-types';
import { Position } from '@/utils/sel';

const Popup = ({
  width,
  height,
  position,
  trianglePosition,
  children,
  className = '',
  triangleClassName = '',
  additionalStyle = {},
}) => (
  <div>
    <div
      id='popup-container'
      className={`bg-base-300 absolute rounded-lg font-sans shadow-xl ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${position ? position.point.x : -999}px`,
        top: `${position ? position.point.y : -999}px`,
        ...additionalStyle,
      }}
    >
      {children}
    </div>
    <div
      className={`triangle text-base-300 absolute ${triangleClassName}`}
      style={{
        left:
          trianglePosition?.dir === 'left'
            ? `${trianglePosition.point.x}px`
            : trianglePosition?.dir === 'right'
              ? `${trianglePosition.point.x}px`
              : `${trianglePosition ? trianglePosition.point.x : -999}px`,
        top:
          trianglePosition?.dir === 'up'
            ? `${trianglePosition.point.y}px`
            : trianglePosition?.dir === 'down'
              ? `${trianglePosition.point.y}px`
              : `${trianglePosition ? trianglePosition.point.y : -999}px`,
        borderLeft:
          trianglePosition?.dir === 'right'
            ? 'none'
            : trianglePosition?.dir === 'left'
              ? `6px solid`
              : '6px solid transparent',
        borderRight:
          trianglePosition?.dir === 'left'
            ? 'none'
            : trianglePosition?.dir === 'right'
              ? `6px solid`
              : '6px solid transparent',
        borderTop:
          trianglePosition?.dir === 'down'
            ? 'none'
            : trianglePosition?.dir === 'up'
              ? `6px solid`
              : '6px solid transparent',
        borderBottom:
          trianglePosition?.dir === 'up'
            ? 'none'
            : trianglePosition?.dir === 'down'
              ? `6px solid`
              : '6px solid transparent',
        transform:
          trianglePosition?.dir === 'left' || trianglePosition?.dir === 'right'
            ? 'translateY(-50%)'
            : 'translateX(-50%)',
      }}
    />
  </div>
);

Popup.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.shape({
    point: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  }),
  trianglePosition: PropTypes.shape({
    dir: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    point: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  triangleClassName: PropTypes.string,
  additionalStyle: PropTypes.object,
};

export default Popup; 