import mongoose from 'mongoose';

export class HealthService {
  public getHealthStatus() {
    const dbState = mongoose.connection.readyState;
    let dbStatus = 'UNKNOWN';
    switch (dbState) {
      case 0: dbStatus = 'DISCONNECTED'; break;
      case 1: dbStatus = 'CONNECTED'; break;
      case 2: dbStatus = 'CONNECTING'; break;
      case 3: dbStatus = 'DISCONNECTING'; break;
    }

    return {
      uptime: process.uptime(),
      timestamp: new Date(),
      status: dbState === 1 ? 'OK' : 'DEGRADED',
      database: dbStatus,
      memoryUsage: process.memoryUsage(),
      version: process.env.npm_package_version || '1.0.0'
    };
  }
}
