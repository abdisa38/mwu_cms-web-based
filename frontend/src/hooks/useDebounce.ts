import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a rapidly changing value (e.g. search input).
 * Delays updating the state until after the specified delay has passed
 * without any new changes.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds (default: 500)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time useEffect is re-called.
    // This cancels the timeout if value changes (also on unmount).
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}
