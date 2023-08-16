import { useRef, useEffect } from 'react';

export const useDebouncedCallback = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 25
) => {
  const callbackRef = useRef<(...args: T) => void>(callback);

  callbackRef.current = callback;

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);

  return (...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  };
};
