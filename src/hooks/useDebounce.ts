import { useState, useEffect } from "react";

/**
 * Debounce hook
 * Prevents expensive re-renders on fast typing
 */
export function useDebounce<T>(value: T, delay: number = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}