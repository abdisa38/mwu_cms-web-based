import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';

// Load env variables
dotenv.config();

import app from './app';
import { socketManager } from './socket/socket.manager';
import { JobScheduler } from './core/jobs/scheduler';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mwu_cms';

// Uncaught Exceptions
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ DB connection successful!');
    
    // Create native HTTP Server and bind Express
    const server = http.createServer(app);

    // Initialize WebSockets
    socketManager.initialize(server);

    // Initialize Background Cron Jobs
    const scheduler = new JobScheduler();
    scheduler.start();
    
    // Start Server
    server.listen(PORT, () => {
      console.log(`🚀 MWU Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

    // Graceful shutdown helpers
    const shutdown = () => {
      console.log('SIGTERM/SIGINT RECEIVED. Shutting down gracefully...');
      server.close(() => {
        console.log('💥 Process terminated!');
        mongoose.connection.close(false).then(() => {
          process.exit(0);
        });
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    // Unhandled Rejections
    process.on('unhandledRejection', (err: Error) => {
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
