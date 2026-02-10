import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('Connecting...');
  const [apiVersion, setApiVersion] = useState('');

  useEffect(() => {
    // Check API connection
    fetch('/api/v1/health')
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setApiVersion(data.api_version);
      })
      .catch(err => {
        setStatus('Offline');
        console.error('API connection error:', err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>AiRGAP</h1>
        <h2>Offline AI Assistant</h2>
        <div className="status-indicator">
          <p>Status: <span className={status === 'healthy' ? 'online' : 'offline'}>{status}</span></p>
          {apiVersion && <p>API Version: {apiVersion}</p>}
        </div>
        <div className="info">
          <p>Your completely offline AI assistant is ready.</p>
          <p>No internet connection required.</p>
        </div>
      </header>
    </div>
  );
}

export default App;
