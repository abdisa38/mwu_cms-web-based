import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

import app from './app';

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
    
    // Start Server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

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
