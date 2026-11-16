import { useMemo } from "react";
import { gridLayout } from "../gridLayout";

export function useGridListLayout(count: number) {
  return useMemo(() => gridLayout(count), [count]);
}
