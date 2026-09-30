import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import globalRouter from './routes';
import { ApiError } from './core/errors';

const app = express();

// ==========================================
// 1. SECURITY & UTILITY MIDDLEWARES
// ==========================================

// Set security HTTP headers
app.use(helmet());

// Rate Limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in 15 minutes.'
});
app.use('/api', limiter);

// Enable CORS (Allow frontend)
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim().replace(/\/+$/, ''))
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const sanitizedOrigin = origin.replace(/\/+$/, '');
    if (
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(sanitizedOrigin) ||
      sanitizedOrigin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

// Cloud platform health check routes
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date() });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'MWU Clearance System API is active' });
});

// Payload parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Data Sanitization against NoSQL query injection
// Note: Zod validation handles this by enforcing strict types on inputs.

// Response compression
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ==========================================
// 2. CENTRAL API ROUTING
// ==========================================
app.use('/api/v1', globalRouter);

// ==========================================
// 3. FALLBACK & GLOBAL ERROR HANDLING
// ==========================================

// Handle unhandled routes (404)
app.all(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global Error Handler
app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if ('statusCode' in err) {
    statusCode = err.statusCode as number;
    message = err.message;
  } else if (err.name === 'ZodError') {
    statusCode = 400;
    const errList = (err as any).errors || (err as any).issues || [];
    message = 'Validation Error: ' + errList.map((e: any) => e.message).join(', ');
  }

  // Handle Mongoose/MongoDB specific errors gracefully here if needed (e.g. Duplicate Key)
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    statusCode = 400;
    message = 'Duplicate key error: A record with this unique value already exists.';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;
