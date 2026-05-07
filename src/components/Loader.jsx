import React from 'react';

const Loader = ({ size = 'md', message = '' }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className="loader" style={{ flexDirection: 'column', gap: '1rem' }}>
      <div className={`spinner ${sizeClass}`}></div>
      {message && <p style={{ marginTop: '1rem', textAlign: 'center' }}>{message}</p>}
    </div>
  );
};

export default Loader;
