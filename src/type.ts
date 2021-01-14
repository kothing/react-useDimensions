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

export type UseDimensionsHook = [
  (node: HTMLElement) => void,
  Dimensions | {},
  HTMLElement | null
];
