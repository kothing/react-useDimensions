import { useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export interface Dimensions {
  readonly x: number;
  readonly y: number;
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly width: number;
  readonly height: number;
}

// Export hook
export function useDimensions(
  dependencies: any[] = [],
): { ref: (node: HTMLElement | null) => void; dimensions: Dimensions } {
  const [node, setNode] = useState<null | HTMLElement>(null);
  const ref = useCallback((newNode: HTMLElement | null) => {
    setNode(newNode);
  }, []);

  // Keep track of measurements
  const [dimensions, setDimensions] = useState<Dimensions>({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  // Define measure function
  const measure = useCallback((innerNode: HTMLElement) => {
    const rect = innerNode.getBoundingClientRect();
    setDimensions({
      x: rect.left,
      y: rect.top,
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  useLayoutEffect(() => {
    if (!node) {
      return;
    }

    // Set initial measurements
    measure(node);

    // Observe resizing of element
    const resizeObserver = new ResizeObserver(() => {
      measure(node);
    });

    resizeObserver.observe(node);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [node, measure, ...dependencies]);

  return {
    ref,
    dimensions,
  };
}
