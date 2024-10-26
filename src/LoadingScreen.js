import React from 'react';

const LoadingScreen = ({ message, description }) => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p className="loading-text">{message}</p>
      {description && <p className="phase-description">{description}</p>}
    </div>
  );
};

export default LoadingScreen;
