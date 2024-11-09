import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ type = 'error', message, duration = 5000, onClose }) => {
  useEffect(() => {

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`alert-container ${type}`}>
      <span className="alert-icon">
        {type === 'success' ? '✔️' : type === 'error' ? '❌' : 'ℹ️'}
      </span>
      {message}
    </div>
  );
};

export default Alert;
