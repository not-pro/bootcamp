import type { Geometry } from "./types";

export const DOCK_THRESHOLD = 18;
export const WAVE_RADIUS = 2;
export const WAVE_DECAY = 0.85;
export const NEIGHBOR_GAIN = 0.35;
export const SMALL_SCALE = 1.035;

export function dockCount(geometry: Geometry) {
  return geometry.rows * geometry.narrowSpan + geometry.fullerItems / geometry.wideSpan;
}
