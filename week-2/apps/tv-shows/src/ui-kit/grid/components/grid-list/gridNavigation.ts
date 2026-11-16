import type { gridGeometry } from "./gridGeometry";

type Geometry = ReturnType<typeof gridGeometry>;

export function gridNavigation(index: number, count: number, geometry: Geometry, key: string) {
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  const fullSize = geometry.wideSpan;
  const smallSize = geometry.narrowSpan;
  const fullRows = geometry.fullerItems / fullSize;
  const row =
    index < geometry.fullerItems
      ? Math.floor(index / fullSize)
      : fullRows + Math.floor((index - geometry.fullerItems) / smallSize);
  const rowStart =
    row < fullRows ? row * fullSize : geometry.fullerItems + (row - fullRows) * smallSize;
  const rowSize = row < fullRows ? fullSize : smallSize;
  const column = index - rowStart;
  if (key === "ArrowLeft") return column > 0 ? index - 1 : index;
  if (key === "ArrowRight") return column + 1 < rowSize ? index + 1 : index;
  const targetRow = row + (key === "ArrowUp" ? -1 : 1);
  if (targetRow < 0 || targetRow >= geometry.rows) return index;
  const targetSize = targetRow < fullRows ? fullSize : smallSize;
  const targetStart =
    targetRow < fullRows
      ? targetRow * fullSize
      : geometry.fullerItems + (targetRow - fullRows) * smallSize;
  return (
    targetStart + Math.min(targetSize - 1, Math.floor(((column + 0.5) * targetSize) / rowSize))
  );
}
