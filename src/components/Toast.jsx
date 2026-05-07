import React, { useState, useEffect } from 'react';

const Toast = ({ id, type, title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`notification ${type}`}>
      <div className="notification-icon">
        {type === 'success' && <span>✓</span>}
        {type === 'error' && <span>✕</span>}
        {type === 'warning' && <span>⚠</span>}
        {type === 'info' && <span>ℹ</span>}
      </div>
      <div className="notification-content">
        <div className="notification-title">{title}</div>
        <div className="notification-message">{message}</div>
      </div>
      <button className="notification-close" onClick={() => onClose(id)}>
        ✕
      </button>
    </div>
  );
};

export default Toast;
