import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDebouncedCallback<
  T extends (..._args: unknown[]) => unknown,
>(fn: T, delay: number) {
  // storing returned result
  const [result, setResult] = useState<ReturnType<T> | null>(null);
  // ref for timeoutID track
  const idRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // memoizing debouncedFn
  const debouncedFn = useCallback(
    (...arg: Parameters<T>) => {
      if (idRef.current) clearTimeout(idRef.current);

      idRef.current = setTimeout(async () => {
        const returnedResult = await fn(...arg);
        setResult(returnedResult as ReturnType<T>);
      }, delay);
    },
    [fn, delay]
  );

  // clearing ref unmount
  useEffect(() => {
    return () => {
      if (idRef.current) {
        clearTimeout(idRef.current);
      }
    };
  }, []);

  return { result, debouncedFn };
}
