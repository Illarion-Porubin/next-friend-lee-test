
import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
  const [message, setMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setIsOpen(true);
      console.log('WebSocket connection opened');
    };

    // Get the key value every 5 seconds
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setMessage(data.key);
    };

    ws.onerror = (event) => {
      setError('WebSocket error occurred');
      console.error('WebSocket error:', event);
    };

    ws.onclose = () => {
      setIsOpen(false);
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { message, isOpen, error };
};

export default useWebSocket;
