import Clarity from '@microsoft/clarity';

// Initialize Clarity with your project ID
export function initClarity() {
  if (typeof window !== 'undefined') {
    Clarity.init('u6sl3w2t8c')
  }
}

// Optional: Custom event tracking
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('event', eventName, eventData)
  }
}

// Optional: Set custom user ID
export function setUserId(userId: string) {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', 'userId', userId)
  }
}
