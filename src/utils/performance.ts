// Performance Monitoring Utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private marks: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Start a performance mark
  startMark(name: string) {
    this.marks.set(name, performance.now());
  }

  // End a performance mark and log the duration
  endMark(name: string) {
    const start = this.marks.get(name);
    if (start) {
      const duration = performance.now() - start;
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      this.marks.delete(name);
    }
  }

  // Measure and log the performance of a function
  measure<T>(name: string, fn: () => T): T {
    this.startMark(name);
    const result = fn();
    this.endMark(name);
    return result;
  }
}

// Image Lazy Loading Utility
export function lazyLoadImage(
  imageSrc: string, 
  placeholderSrc?: string
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Optional placeholder handling
    if (placeholderSrc) {
      img.src = placeholderSrc;
    }

    img.onload = () => {
      img.src = imageSrc;
      resolve(img);
    };

    img.onerror = (error) => {
      console.error('Image loading failed:', error);
      reject(error);
    };
  });
}

// Code Splitting Utility
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>, 
  fallback?: React.ReactNode
) {
  return React.lazy(importFn);
}