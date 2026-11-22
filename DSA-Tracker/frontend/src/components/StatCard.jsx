import React from 'react';

const StatCard = ({ title, value, type = 'total', icon, subtitle }) => {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon-wrapper">
        {icon}
      </div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
        {subtitle && (
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
