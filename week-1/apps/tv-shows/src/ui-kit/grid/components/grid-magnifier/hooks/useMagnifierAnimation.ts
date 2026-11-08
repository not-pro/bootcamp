import { useCallback, useRef } from "react";
import { dockFrame } from "../dockFrame";
import type { Geometry, LensState } from "../types";

export function useMagnifierAnimation(desktop: Geometry, tablet: Geometry, mobile: Geometry) {
  const point = useRef({ x: 0, y: 0, focused: undefined as number | undefined });

  return useCallback(
    (
      root: HTMLElement,
      items: HTMLUListElement,
      state: LensState,
      x: number,
      y: number,
      focused?: number,
    ) => {
      clearTimeout(state.timer);
      point.current = { x, y, focused };
      if (state.frame) return;
      state.frame = requestAnimationFrame(() => {
        state.frame = 0;
        const geometry = window.matchMedia("(max-width: 480px)").matches
          ? mobile
          : window.matchMedia("(max-width: 760px)").matches
            ? tablet
            : desktop;
        const { x: clientX, y: clientY, focused: focusedIndex } = point.current;
        dockFrame(root, items, geometry, state, clientX, clientY, focusedIndex);
      });
    },
    [desktop, tablet, mobile],
  );
}
