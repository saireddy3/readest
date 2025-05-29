import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const Quota = ({ quotas, showProgress, className }) => {
  return (
    <div className={clsx('text-base-content w-full space-y-2 rounded-md text-base sm:text-sm')}>
      {quotas.map((quota) => {
        const usagePercentage = (quota.used / quota.total) * 100;
        let bgColor = 'bg-green-500';
        if (usagePercentage > 80) {
          bgColor = 'bg-red-500';
        } else if (usagePercentage > 50) {
          bgColor = 'bg-yellow-500';
        }

        return (
          <div
            key={quota.name}
            className={clsx(
              'relative w-full overflow-hidden rounded-md',
              showProgress && 'border-base-300 border',
            )}
          >
            {showProgress && (
              <div
                className={`absolute left-0 top-0 h-full ${bgColor}`}
                style={{ width: `${usagePercentage}%` }}
              ></div>
            )}

            <div className={clsx('relative flex items-center justify-between p-2', className)}>
              <div className='lg:tooltip lg:tooltip-bottom' data-tip={quota.tooltip}>
                <span className='truncate'>{quota.name}</span>
              </div>
              <div className='text-right text-xs'>
                {quota.used} / {quota.total} {quota.unit}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Quota.propTypes = {
  quotas: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
      used: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
  showProgress: PropTypes.bool,
};

export default Quota; 