/**
 * Simple API response caching utility
 * Provides in-memory caching with time-based expiration
 */

interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

type CacheKey = string;

class ApiCache {
  private cache: Map<CacheKey, CacheItem<unknown>> = new Map();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes in milliseconds

  /**
   * Set an item in the cache
   * @param key Cache key
   * @param data Data to cache
   * @param ttl Time to live in milliseconds (defaults to 5 minutes)
   */
  set<T>(key: CacheKey, data: T, ttl: number = this.defaultTTL): void {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { data, expiresAt });
  }

  /**
   * Get an item from the cache
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  get<T>(key: CacheKey): T | null {
    const item = this.cache.get(key);
    
    // Return null if item does not exist
    if (!item) return null;
    
    // Return null if item is expired and clean it up
    if (Date.now() > item.expiresAt) {
      this.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  /**
   * Check if an item exists in the cache and is not expired
   * @param key Cache key
   * @returns True if the item exists and is not expired
   */
  has(key: CacheKey): boolean {
    const item = this.cache.get(key);
    if (!item) return false;
    
    const isExpired = Date.now() > item.expiresAt;
    if (isExpired) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  /**
   * Delete an item from the cache
   * @param key Cache key
   */
  delete(key: CacheKey): void {
    this.cache.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clear all expired items from the cache
   */
  clearExpired(): void {
    for (const [key, item] of this.cache.entries()) {
      if (Date.now() > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Export a singleton instance
export const apiCache = new ApiCache();

/**
 * Generate a cache key for API requests
 * @param endpoint API endpoint
 * @param params Optional parameters
 * @returns Cache key
 */
export function generateCacheKey(endpoint: string, params?: Record<string, unknown>): string {
  if (!params) return endpoint;
  
  // Create a deterministic string from params object
  const paramsString = Object.keys(params)
    .sort()
    .map(key => `${key}=${JSON.stringify(params[key])}`)
    .join('&');
  
  return `${endpoint}?${paramsString}`;
}