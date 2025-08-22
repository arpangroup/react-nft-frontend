// pages/ErrorPage.jsx
import React from 'react';

const ErrorPage = ({ onRetry }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>⚠️ Backend Connection Error</h1>
      <p>We are unable to connect to the server.</p>
      <p>Please check your internet connection or try again.</p>
      <button 
        onClick={onRetry} 
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        🔁 Retry Now
      </button>
    </div>
  );
};

export default ErrorPage;
