import type { Geometry } from "./types";

export function dockCount(geometry: Geometry) {
  return geometry.rows * geometry.narrowSpan + geometry.fullerItems / geometry.wideSpan;
}
