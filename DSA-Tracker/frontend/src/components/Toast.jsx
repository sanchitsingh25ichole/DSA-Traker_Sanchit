import React from 'react';

const Toast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          <div style={{ flex: 1 }}>{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: '#94a3b8', fontSize: '1.1rem', cursor: 'pointer', padding: '0 4px' }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
