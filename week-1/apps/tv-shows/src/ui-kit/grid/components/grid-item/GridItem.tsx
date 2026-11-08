import { memo, useMemo, ViewTransition } from "react";
import type { CSSProperties, ReactNode } from "react";
import styles from "./GridItem.module.css";

type Props = {
  children: ReactNode;
  desktopSpan: number;
  tabletSpan: number;
  mobileSpan: number;
  dense: boolean;
};

export const GridItem = memo(function GridItem({
  children,
  desktopSpan,
  tabletSpan,
  mobileSpan,
  dense,
}: Props) {
  const style: CSSProperties & Record<`--${string}`, number> = useMemo(
    () => ({ "--span": desktopSpan, "--tablet-span": tabletSpan, "--mobile-span": mobileSpan }),
    [desktopSpan, tabletSpan, mobileSpan],
  );
  return (
    <ViewTransition
      default={dense ? "none" : "catalog-card"}
      enter={dense ? "none" : "card-enter"}
      exit={dense ? "none" : "card-exit"}
      update={dense ? "none" : "card-update"}
    >
      <li className={styles["item"]} style={style}>
        {children}
      </li>
    </ViewTransition>
  );
});
