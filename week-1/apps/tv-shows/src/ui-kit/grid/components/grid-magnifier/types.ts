import type { WAAPIAnimation } from "animejs/waapi";
export type Geometry = { rows: number; fullerItems: number; narrowSpan: number; wideSpan: number };
export type Box = { x: number; y: number; width: number; height: number };
export type Layer = {
  node: HTMLDivElement;
  source: Element | null;
  index: number;
  baseTransform: string;
  animation: WAAPIAnimation | undefined;
};
export type LensState = {
  layers: Layer[];
  primary: Layer;
  boxes: Map<number, Box>;
  frame: number;
  timer: ReturnType<typeof setTimeout> | undefined;
  hot: number;
  preview: HTMLDivElement;
  bounds: DOMRect | undefined;
};
