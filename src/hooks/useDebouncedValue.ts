import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedVal;
}
