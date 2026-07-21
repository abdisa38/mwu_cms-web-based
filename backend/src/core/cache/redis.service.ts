import { createClient } from 'redis';

export class CacheService {
  private client: ReturnType<typeof createClient>;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      console.log('✅ Redis connected successfully.');
      this.isConnected = true;
    });
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
      } catch (error) {
        console.error('Failed to connect to Redis. Running without cache.');
      }
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) return null;
    try {
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Cache GET Error for key ${key}:`, error);
      return null;
    }
  }

  public async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      console.error(`Cache SET Error for key ${key}:`, error);
    }
  }

  public async delete(key: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.del(key);
    } catch (error) {
      console.error(`Cache DELETE Error for key ${key}:`, error);
    }
  }

  /**
   * Delete keys by pattern. Useful for invalidating all user caches.
   */
  public async deletePattern(pattern: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error(`Cache DELETE PATTERN Error for ${pattern}:`, error);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
    }
  }
}

export const cacheService = new CacheService();
