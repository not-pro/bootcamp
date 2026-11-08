export function gridGeometry(count: number, preferredColumns: number) {
  const rows = Math.max(1, Math.ceil(count / preferredColumns));
  const perRow = Math.max(1, Math.floor(count / rows));
  const fullerRows = count % rows;
  return {
    rows,
    tracks: perRow * (perRow + 1),
    columns: perRow + Number(fullerRows > 0),
    fullerItems: fullerRows * (perRow + 1),
    narrowSpan: perRow,
    wideSpan: perRow + 1,
  };
}
