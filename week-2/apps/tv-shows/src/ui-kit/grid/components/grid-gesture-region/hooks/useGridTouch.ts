import { useCallback, useRef } from "react";
import type { RefObject, TouchEvent } from "react";

export function useGridTouch(
  change: (direction: number) => void,
  transitionAtRef: RefObject<number>,
) {
  const touch = useRef<number | null>(null);
  const onTouchStart = useCallback((event: TouchEvent<HTMLElement>) => {
    touch.current = event.touches.length === 1 ? (event.touches[0]?.clientY ?? null) : null;
  }, []);
  const onTouchEnd = useCallback(
    (event: TouchEvent<HTMLElement>) => {
      const end = event.changedTouches[0]?.clientY;
      if (
        touch.current !== null &&
        end !== undefined &&
        Math.abs(touch.current - end) > 60 &&
        Date.now() - transitionAtRef.current >= 650
      ) {
        change(Math.sign(touch.current - end));
        transitionAtRef.current = Date.now();
      }
      touch.current = null;
    },
    [change, transitionAtRef],
  );

  return { onTouchStart, onTouchEnd };
}
