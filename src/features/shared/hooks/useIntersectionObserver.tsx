import { useEffect, useRef } from "react";

type IntersectionObserverProps = {
  ref: React.RefObject<Element | null>;
  options?: IntersectionObserverInit;
  callback: IntersectionObserverCallback;
};

const useIntersectionObserver = ({
  ref,
  options,
  callback,
}: IntersectionObserverProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      observer.current = new IntersectionObserver(callback, options);
      observer.current.observe(currentRef);
    }

    return () => {
      if (observer.current && currentRef) {
        observer.current.unobserve(currentRef);
        observer.current.disconnect();
      }
    };
  }, [ref, options, callback]);
};

export default useIntersectionObserver;
