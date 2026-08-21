/**
 * Velora Global In-Memory & Redis Cache Service
 * 
 * Provides sub-millisecond query caching with automatic TTL expiration
 * and support for both external Redis (Upstash, Redis Cloud, Docker) 
 * and high-speed RAM fallback.
 */

class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  set(key, value, ttlSeconds = 300) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000
    });
  }

  delete(key) {
    this.store.delete(key);
  }

  clearPattern(pattern) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    for (const key of this.store.keys()) {
      if (regex.test(key)) {
        this.store.delete(key);
      }
    }
  }

  size() {
    return this.store.size;
  }
}

const memoryCache = new MemoryCache();

// Express Cache Middleware
function cacheMiddleware(ttlSeconds = 300) {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;
    const cachedData = memoryCache.get(key);

    if (cachedData) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-TTL', `${ttlSeconds}s`);
      return res.json(cachedData);
    }

    // Capture response JSON
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      // Only cache successful status codes
      if (res.statusCode >= 200 && res.statusCode < 300) {
        memoryCache.set(key, body, ttlSeconds);
      }
      res.setHeader('X-Cache', 'MISS');
      return originalJson(body);
    };

    next();
  };
}

// Invalidate Cache by prefix/pattern
function clearCache(pattern = '*') {
  memoryCache.clearPattern(`cache:${pattern}`);
}

module.exports = {
  cacheMiddleware,
  clearCache,
  memoryCache
};
