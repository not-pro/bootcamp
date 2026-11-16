import { useCallback } from "react";
import type { KeyboardEvent, RefObject } from "react";
import type { gridGeometry } from "../gridGeometry";
import { gridNavigation } from "../gridNavigation";

type Geometry = ReturnType<typeof gridGeometry>;

export function useGridListNavigation(
  list: RefObject<HTMLUListElement | null>,
  count: number,
  desktop: Geometry,
  tablet: Geometry,
  mobile: Geometry,
) {
  return useCallback(
    (event: KeyboardEvent<HTMLUListElement>) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key))
        return;
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches("button, a[href]")) return;
      const item = target.closest("li");
      const currentList = list.current;
      if (
        !item ||
        item.parentElement !== currentList ||
        item.querySelector("button, a[href]") !== target
      )
        return;
      if (!currentList) return;
      const index = Array.prototype.indexOf.call(currentList.children, item);
      const geometry = window.matchMedia("(max-width: 480px)").matches
        ? mobile
        : window.matchMedia("(max-width: 760px)").matches
          ? tablet
          : desktop;
      const nextIndex = gridNavigation(index, count, geometry, event.key);
      const next = currentList.children
        .item(nextIndex)
        ?.querySelector<HTMLElement>("button, a[href]");
      if (next) {
        event.preventDefault();
        next.focus();
      }
    },
    [list, count, desktop, tablet, mobile],
  );
}
