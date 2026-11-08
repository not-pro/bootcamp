import type { Box, Geometry } from "./types";
export function dockBox(geometry: Geometry, index: number, bounds: DOMRect): Box {
  const { fullerItems, wideSpan, narrowSpan, rows } = geometry;
  const fullerRows = fullerItems / wideSpan;
  const full = index < fullerItems;
  const columns = full ? wideSpan : narrowSpan;
  const row = full
    ? Math.floor(index / columns)
    : fullerRows + Math.floor((index - fullerItems) / columns);
  const column = full ? index % columns : (index - fullerItems) % columns;
  const gapX = Math.min(5, (0.3 * bounds.width) / (fullerItems ? wideSpan : narrowSpan));
  const gapY = Math.min(5, (0.3 * bounds.height) / rows);
  const stepX = (bounds.width + gapX) / columns;
  const stepY = (bounds.height + gapY) / rows;
  return { x: column * stepX, y: row * stepY, width: stepX - gapX, height: stepY - gapY };
}
