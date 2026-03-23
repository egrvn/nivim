import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "./scroll";

export function useReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return undefined;
    }

    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, ...options },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
