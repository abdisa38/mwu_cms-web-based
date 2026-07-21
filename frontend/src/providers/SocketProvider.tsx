import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'sonner';

interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({ socket: null, isConnected: false });

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Only connect if user is authenticated
    if (!token || !user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Initialize Socket
    const socketInstance = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected:', socketInstance.id);
      
      // Join role-specific rooms
      socketInstance.emit('join_room', `role_${user.role}`);
      if (user.department) {
        socketInstance.emit('join_room', `dept_${user.department}`);
      }
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    // Global Events
    socketInstance.on('NEW_NOTIFICATION', (data: any) => {
      toast(data.title, {
        description: data.message,
        action: { label: 'View', onClick: () => window.location.href = data.link || '/notifications' }
      });
    });

    socketInstance.on('WORKFLOW_UPDATED', (data: any) => {
      toast.info(`Clearance Update`, { description: `Workflow stage advanced to ${data.status}` });
      // In a real app, you would also dispatch a Redux invalidation here to refresh the UI
      // e.g., store.dispatch(baseApi.util.invalidateTags(['Clearance', 'RegistrarQueue']))
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token, user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
