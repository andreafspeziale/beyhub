import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface UseElementHeightOptions {
  defaultHeight?: number;
}

interface UseElementHeightResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  height: number;
}

export function useElementHeight<T extends HTMLElement = HTMLDivElement>(
  options: UseElementHeightOptions = {},
): UseElementHeightResult<T> {
  const { defaultHeight = 0 } = options;
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState<number>(defaultHeight);

  const updateHeight = useCallback(() => {
    if (ref.current) {
      const newHeight = ref.current.offsetHeight;
      if (newHeight > 0) {
        setHeight(newHeight);
      }
    }
  }, []);

  // Measure height on mount and when content changes
  useLayoutEffect(() => {
    updateHeight();
  }, [updateHeight]);

  // Re-measure on window resize
  useEffect(() => {
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [updateHeight]);

  return { ref, height };
}
