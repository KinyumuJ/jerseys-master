import React from 'react';

const Modal = ({ isOpen, title, children, onClose, actions = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {actions.length > 0 && (
          <div className="modal-footer">
            {actions.map((action, idx) => (
              <button
                key={idx}
                className={`btn ${action.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
