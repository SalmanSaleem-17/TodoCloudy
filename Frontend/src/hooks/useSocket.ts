import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || '', {
      auth: { token },
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return { socket };
}