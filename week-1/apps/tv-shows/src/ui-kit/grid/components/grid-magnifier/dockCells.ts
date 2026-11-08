import type { Geometry } from "./types";
import { dockCount, DOCK_THRESHOLD, WAVE_RADIUS } from "./dockConfig";

export function dockCells(geometry: Geometry, x: number, y: number, focused?: number) {
  const { rows, fullerItems, wideSpan, narrowSpan } = geometry;
  const fullRows = fullerItems / wideSpan;
  const rowStart = (row: number) =>
    row < fullRows ? row * wideSpan : fullerItems + (row - fullRows) * narrowSpan;
  const rowSize = (row: number) => (row < fullRows ? wideSpan : narrowSpan);
  const row =
    focused === undefined
      ? Math.min(rows - 1, Math.max(0, Math.floor(y * rows)))
      : focused < fullerItems
        ? Math.floor(focused / wideSpan)
        : fullRows + Math.floor((focused - fullerItems) / narrowSpan);
  const hot =
    focused ??
    rowStart(row) + Math.min(rowSize(row) - 1, Math.max(0, Math.floor(x * rowSize(row))));
  const magnified = dockCount(geometry) > DOCK_THRESHOLD;
  const cells = [{ index: hot, step: 0 }];
  if (!magnified) return { hot, cells, magnified };
  const fraction = (hot - rowStart(row) + 0.5) / rowSize(row);
  for (let r = Math.max(0, row - WAVE_RADIUS); r <= Math.min(rows - 1, row + WAVE_RADIUS); r++) {
    const column = Math.min(rowSize(r) - 1, Math.floor(fraction * rowSize(r)));
    for (
      let c = Math.max(0, column - WAVE_RADIUS);
      c <= Math.min(rowSize(r) - 1, column + WAVE_RADIUS);
      c++
    ) {
      const index = rowStart(r) + c;
      const step = Math.abs(r - row) + Math.abs(c - column);
      if (index !== hot && step <= WAVE_RADIUS) cells.push({ index, step });
    }
  }
  return { hot, cells, magnified };
}
