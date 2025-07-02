
import { useState, useCallback } from 'react';

interface RateLimiterConfig {
  maxAttempts: number;
  windowMs: number;
}

interface AttemptRecord {
  count: number;
  resetTime: number;
}

export function useRateLimiter(config: RateLimiterConfig) {
  const [attempts, setAttempts] = useState<Map<string, AttemptRecord>>(new Map());

  const isAllowed = useCallback((key: string): boolean => {
    const now = Date.now();
    const record = attempts.get(key);
    
    if (!record || now > record.resetTime) {
      // Reset or first attempt
      setAttempts(prev => new Map(prev).set(key, {
        count: 1,
        resetTime: now + config.windowMs
      }));
      return true;
    }
    
    if (record.count >= config.maxAttempts) {
      return false; // Rate limited
    }
    
    // Increment attempt count
    setAttempts(prev => new Map(prev).set(key, {
      ...record,
      count: record.count + 1
    }));
    
    return true;
  }, [attempts, config]);

  const getRemainingTime = useCallback((key: string): number => {
    const record = attempts.get(key);
    if (!record) return 0;
    
    const now = Date.now();
    return Math.max(0, record.resetTime - now);
  }, [attempts]);

  const reset = useCallback((key: string) => {
    setAttempts(prev => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  return { isAllowed, getRemainingTime, reset };
}
