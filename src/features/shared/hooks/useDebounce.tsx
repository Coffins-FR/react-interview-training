import { useEffect } from "react";

const useDebounce = <T,>(callback: () => T, delay: number): void => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};

export default useDebounce;
