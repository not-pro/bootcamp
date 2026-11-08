import type { ReactNode, RefObject } from "react";
import { useMagnifierAnimation } from "./hooks/useMagnifierAnimation";
import { useMagnifierEvents } from "./hooks/useMagnifierEvents";
import type { Geometry } from "./types";
import styles from "./GridMagnifier.module.css";
type Props = {
  children: ReactNode;
  list: RefObject<HTMLUListElement | null>;
  desktop: Geometry;
  tablet: Geometry;
  mobile: Geometry;
};

export function GridMagnifier({ children, list, desktop, tablet, mobile }: Props) {
  const schedule = useMagnifierAnimation(desktop, tablet, mobile);
  const { host, preview } = useMagnifierEvents(list, schedule);
  return (
    <div ref={host} className={styles["root"]}>
      {children}
      <div ref={preview} className={styles["preview"]} aria-hidden="true" inert hidden />
    </div>
  );
}
