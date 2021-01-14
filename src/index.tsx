import { useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { UseDimensionsHook, Dimensions } from './type';

const defaultDimensions: Dimensions = {
  x: 0,
  y: 0,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
};

const getDimensions = (node: HTMLElement): Dimensions => {
  const rect = node.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  };
};

// Export hook
export function useDimensions(dependencies: any[] = []): UseDimensionsHook {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>(defaultDimensions);

  const ref = useCallback((newNode: HTMLElement | null) => {
    setNode(newNode);
  }, []);

  useLayoutEffect(() => {
    if (!node) {
      return;
    }

    // Set initial measurements
    setDimensions(getDimensions(node));

    // Observe resizing of element
    const resizeObserver = new ResizeObserver(() => {
      setDimensions(getDimensions(node));
    });
    resizeObserver.observe(node);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [node, ...dependencies]);

  return [ref, dimensions, node];
}
