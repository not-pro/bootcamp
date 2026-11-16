import { useCallback } from "react";
import type { KeyboardEvent } from "react";

export function useGridKeyboard(change: (direction: number) => void) {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key !== "PageDown" && event.key !== "PageUp") return;
      event.preventDefault();
      if (!event.repeat) change(event.key === "PageDown" ? 1 : -1);
    },
    [change],
  );
}
