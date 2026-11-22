import React from 'react';

const ProgressBar = ({
  percentage = 0,
  variant = 'primary',
  height = '8px',
  showLabel = false,
  label = ''
}) => {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            fontWeight: '600',
            marginBottom: '6px',
            color: 'var(--text-secondary)'
          }}
        >
          <span>{label}</span>
          <span>{safePercentage}%</span>
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className={`progress-fill ${variant}`}
          style={{ width: `${safePercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
