
'use client';

import { useEffect } from 'react';
import useWebSocket from './hooks/useWebSocket';

const HomePage = () => {
  const { message, isOpen, error } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (isOpen) {
      console.log('WebSocket is connected');
    } else {
      console.log('WebSocket is disconnected');
    }
  }, [isOpen]);


  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>
        This page opens a WebSocket connection and receives a key value every 5 seconds.
      </p>
      {error && <div><strong>Error:</strong> {error}</div>}
      <div>
        <strong>Received Key:</strong> {message || 'No message yet'}
      </div>
    </div>
  );
};

export default HomePage;
