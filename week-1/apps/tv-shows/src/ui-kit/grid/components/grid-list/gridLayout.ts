import type { CSSProperties } from "react";
import { gridGeometry } from "./gridGeometry";

export function gridLayout(count: number) {
  const desktop = gridGeometry(count, Math.max(3, Math.ceil(Math.sqrt(count * 1.5))));
  const tablet = gridGeometry(count, Math.max(2, Math.ceil(Math.sqrt(count))));
  const mobile = gridGeometry(count, Math.max(1, Math.ceil(Math.sqrt(count / 3))));
  const gridStyle: CSSProperties & Record<`--${string}`, number> = {
    "--columns": desktop.tracks,
    "--column-count": desktop.columns,
    "--rows": desktop.rows,
    "--tablet-columns": tablet.tracks,
    "--tablet-column-count": tablet.columns,
    "--tablet-rows": tablet.rows,
    "--mobile-columns": mobile.tracks,
    "--mobile-column-count": mobile.columns,
    "--mobile-rows": mobile.rows,
  };
  return { desktop, tablet, mobile, gridStyle };
}
