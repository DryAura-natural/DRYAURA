import { useEffect } from 'react';

/**
 * A custom hook that handles keypress events
 * @param key - The key to listen for (e.g., 'Escape')
 * @param callback - The function to call when the key is pressed
 */
export const useKeypress = (key: string, callback: () => void) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [key, callback]);
};
