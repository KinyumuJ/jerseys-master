import React from 'react'

const Button = ({ variant = 'primary', size = 'md', className = '', disabled = false, children, ...props }) => {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const finalClass = `btn ${variantClass} ${sizeClass} ${className}`.trim();
  
  return (
    <button
      className={finalClass}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button

