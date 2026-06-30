import dotenv from 'dotenv';

// Load environment variables FIRST before importing anything else
dotenv.config();

import express, { Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import algorithmRoutes from './routes/algorithm.routes';
import executionRoutes from './routes/execution.routes';
import visualizationRoutes from './routes/visualization.routes';
import comprehensiveExecutionRoutes from './routes/execution.comprehensive.routes';
import playgroundRoutes from './routes/playground.routes';
import authRoutes from './routes/auth.routes';
import { authService } from './services/auth.service';
import socketManager from './websocket/socketManager';

const app: Application = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/algo_visualizer';

// Initialize WebSocket
socketManager.initialize(httpServer);

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS Configuration for Development and Production
const frontendUrl = process.env.FRONTEND_URL?.replace(/\/$/, ''); // Remove trailing slash
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  frontendUrl,
].filter(Boolean);

// Debug logs
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('Allowed Origins:', allowedOrigins);

app.use(
  cors({
    origin: (_origin, callback) => {
      console.log('Incoming Origin:', _origin);

      // Allow requests with no origin (Postman, server-to-server, etc.)
      if (!_origin) {
        return callback(null, true);
      }

      // Allow localhost during development
      if (_origin.startsWith('http://localhost:')) {
        return callback(null, true);
      }

      // Remove trailing slash from origin for comparison
      const normalizedOrigin = _origin.replace(/\/$/, '');

      // Allow configured frontend
      if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes(_origin)) {
        return callback(null, true);
      }

      console.log('Blocked Origin:', _origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// API Routes
app.use('/api/algorithms', algorithmRoutes);
app.use('/api/execute', executionRoutes);
app.use('/api/comprehensive', comprehensiveExecutionRoutes); // Changed from /api/execute to avoid conflicts
app.use('/api/visualize', visualizationRoutes);
app.use('/api/playground', playgroundRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('🍃 Connected to MongoDB');
    authService.setUseMongoDB(true);
  } catch (err) {
    console.warn(
      '⚠️ MongoDB connection failed. Falling back to in-memory storage.'
    );
    console.warn('⚠️ Data will NOT be persisted after restart.');
    authService.setUseMongoDB(false);
  }

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log('📊 Algorithm Visualizer Backend Started');
    console.log(
      `🔧 Environment: ${process.env.NODE_ENV || 'development'}`
    );
  });
};

startServer();

export default app;
