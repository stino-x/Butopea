/**
 * Navigation utility functions for handling external links
 * Centralized to ensure consistent behavior across all banner components
 */

/**
 * Safely navigates to an external URL in a new tab
 * @param url - The URL to navigate to (optional)
 * @param fallback - Fallback URL if primary URL is invalid (default: '#')
 */
export const handleExternalNavigation = (url?: string, fallback: string = '#'): void => {
    const targetUrl = url || fallback;
    
    // Only navigate if URL is not the fallback placeholder
    if (targetUrl && targetUrl !== '#') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  /**
   * Validates if a URL is safe for navigation
   * @param url - The URL to validate
   * @returns boolean indicating if URL is valid and safe
   */
  export const isValidUrl = (url?: string): boolean => {
    if (!url || url === '#') return false;
    
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  /**
   * Creates a navigation handler function with the provided URL
   * Useful for passing to onClick handlers
   * @param url - The URL to navigate to
   * @returns Function that handles the navigation
   */
  export const createNavigationHandler = (url?: string) => (): void => {
    handleExternalNavigation(url);
  };