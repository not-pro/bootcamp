export function gridGeometry(count: number, preferredColumns: number) {
  const rows = Math.max(1, Math.ceil(count / preferredColumns));
  const perRow = Math.max(1, Math.floor(count / rows));
  const fullerRows = count % rows;
  const columns = perRow + Number(fullerRows > 0);
  return {
    rows,
    tracks: perRow * (perRow + 1),
    columns,
    capacity: rows * columns,
    fullerItems: fullerRows * (perRow + 1),
    narrowSpan: perRow,
    wideSpan: perRow + 1,
  };
}
