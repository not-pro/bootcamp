import { useCallback, useRef } from "react";
import type { WheelEvent } from "react";

export function useGridWheel(change: (direction: number) => void) {
  const wheel = useRef({ sum: 0, last: 0 });
  const transitionAt = useRef(0);
  const onWheel = useCallback(
    (event: WheelEvent<HTMLElement>) => {
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const now = Date.now();
      if (now - wheel.current.last > 250) {
        wheel.current.sum = 0;
      }
      wheel.current.last = now;
      if (now - transitionAt.current < 650) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 300 : 1);
      wheel.current.sum += delta;
      if (Math.abs(wheel.current.sum) >= 35) {
        change(Math.sign(wheel.current.sum));
        wheel.current.sum = 0;
        transitionAt.current = now;
      }
    },
    [change],
  );

  return { onWheel, transitionAt };
}
