import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import { createDockState, resetDock } from "../resetDock";
import type { LensState } from "../types";
import type { useMagnifierAnimation } from "./useMagnifierAnimation";

export function useMagnifierEvents(
  list: RefObject<HTMLUListElement | null>,
  schedule: ReturnType<typeof useMagnifierAnimation>,
) {
  const host = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const cache = useRef<LensState | null>(null);

  useLayoutEffect(() => {
    const root = host.current,
      items = list.current;
    if (!root || !items || !preview.current) return undefined;
    const state = cache.current ?? createDockState(preview.current);
    cache.current = state;
    const events = new AbortController();
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.buttons || !matchMedia("(hover: hover)").matches)
        return;
      schedule(root, items, state, event.clientX, event.clientY);
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement) || !event.target.matches(":focus-visible")) return;
      const item = event.target.closest("li");
      if (item?.parentElement !== items) return;
      schedule(root, items, state, 0, 0, Array.prototype.indexOf.call(items.children, item));
    };
    const leave = () => resetDock(state, false);
    const clear = () => {
      resetDock(state, true);
      state.boxes.clear();
      state.bounds = undefined;
    };
    const blur = (event: FocusEvent) => {
      if (!(event.relatedTarget instanceof Node) || !root.contains(event.relatedTarget)) leave();
    };
    const key = (event: KeyboardEvent) => {
      if (["Escape", "PageDown", "PageUp"].includes(event.key)) clear();
    };
    const observer = new ResizeObserver(clear);
    observer.observe(root);
    root.addEventListener("pointermove", move, { signal: events.signal });
    root.addEventListener("pointerup", move, { signal: events.signal });
    root.addEventListener("pointerleave", leave, { signal: events.signal });
    root.addEventListener("focusin", focus, { signal: events.signal });
    root.addEventListener("focusout", blur, { signal: events.signal });
    root.addEventListener("wheel", clear, { capture: true, passive: true, signal: events.signal });
    root.addEventListener("keydown", key, { capture: true, signal: events.signal });
    return () => {
      events.abort();
      observer.disconnect();
      clear();
    };
  }, [list, schedule]);

  return { host, preview };
}
