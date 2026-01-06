import { useEffect, useState } from "react";

const useDebounce = <T,>(callback: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(callback);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(callback);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);

  return debouncedValue;
};

export default useDebounce;
