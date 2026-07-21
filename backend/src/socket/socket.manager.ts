import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt.util';

class SocketManager {
  private io!: Server;

  public initialize(server: HttpServer) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.io.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (!token) return next(new Error('Authentication error: No token'));
        
        const decoded = verifyAccessToken(token);
        // @ts-ignore
        socket.user = decoded;
        next();
      } catch (err) {
        next(new Error('Authentication error: Invalid token'));
      }
    });

    this.io.on('connection', (socket: Socket) => {
      // @ts-ignore
      const userId = socket.user?.userId;
      
      if (userId) {
        socket.join(userId); // Join a private room based on user ID
        console.log(`Socket Connected: User ${userId} (${socket.id})`);
      }

      socket.on('disconnect', () => {
        console.log(`Socket Disconnected: User ${userId} (${socket.id})`);
      });

      // Typings/Presence could be added here
      socket.on('typing', (data: { conversationId: string, isTyping: boolean }) => {
        // Broadcasst typing indicator to conversation room (needs conversation tracking)
      });
    });
  }

  public getIO(): Server {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }
    return this.io;
  }

  /**
   * Send a real-time event to a specific user
   */
  public sendToUser(userId: string, event: string, data: any) {
    if (this.io) {
      this.io.to(userId).emit(event, data);
    }
  }

  /**
   * Broadcast an event to all connected users
   */
  public broadcast(event: string, data: any) {
    if (this.io) {
      this.io.emit(event, data);
    }
  }
}

export const socketManager = new SocketManager();
