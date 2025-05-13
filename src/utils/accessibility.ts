// Accessibility Utility Functions
export class AccessibilityHelper {
  // Generate unique, consistent IDs
  static generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Manage focus for modal or dropdown interactions
  static trapFocus(containerRef: React.RefObject<HTMLElement>) {
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // Shift + Tab
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } 
        // Tab
        else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }

  // Check color contrast
  static checkColorContrast(foreground: string, background: string): number {
    const getLuminance = (color: string) => {
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >>  8) & 0xff;
      const b = (rgb >>  0) & 0xff;
      
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928
          ? v / 12.92
          : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);

    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  // Announce dynamic content changes for screen readers
  static announceChange(message: string) {
    const announcer = document.getElementById('live-announcer');
    if (announcer) {
      announcer.textContent = message;
    } else {
      const newAnnouncer = document.createElement('div');
      newAnnouncer.id = 'live-announcer';
      newAnnouncer.setAttribute('aria-live', 'polite');
      newAnnouncer.style.position = 'absolute';
      newAnnouncer.style.left = '-9999px';
      newAnnouncer.textContent = message;
      document.body.appendChild(newAnnouncer);
    }
  }
}

// React Hook for managing keyboard interactions
export function useKeyboardNavigation(
  onEscape?: () => void, 
  onEnter?: () => void
) {
  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    switch(event.key) {
      case 'Escape':
        onEscape?.();
        break;
      case 'Enter':
        onEnter?.();
        break;
    }
  }, [onEscape, onEnter]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}