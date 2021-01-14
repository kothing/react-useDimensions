# react-useDimensions

This package allows you to measure the size of any HTML element inside one of your React functional components using hooks.

## Usage

```tsx
import { useDimensions } from '@/react-useDimensions';

function MyComponent() {
  const [ref, dimensions] = useDimensions();

  return (
    <div
      ref={ref}
      style={{
        width: '500px',
        height: '100px',
        margin: '0 auto',
      }}
    >
      my size is {dimensions.width} × {dimensions.height}
    </div>
  );
}
```

## Features

- Uses react hooks
- TypeScript compatible
- Uses [resize-observer-polyfill](https://www.npmjs.com/package/resize-observer-polyfill) to detect all changes in size
