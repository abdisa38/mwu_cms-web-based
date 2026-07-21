import { useEffect } from 'react';
import { useSocketContext } from '@/providers/SocketProvider';

/**
 * A custom hook to listen to specific Socket.IO events.
 * Handles automatic cleanup on unmount.
 *
 * @param eventName The name of the socket event to listen to
 * @param callback The function to execute when the event is received
 */
export const useSocket = (eventName: string, callback: (data: any) => void) => {
  const { socket, isConnected } = useSocketContext();

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Register event listener
    socket.on(eventName, callback);

    // Cleanup on unmount
    return () => {
      socket.off(eventName, callback);
    };
  }, [socket, isConnected, eventName, callback]);

  return { socket, isConnected };
};
