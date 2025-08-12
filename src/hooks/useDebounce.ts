import { useEffect, useState } from 'react';

/**
 * Debounces a value by a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds. Defaults to 500ms.
 * @returns The debounced value.
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
};
