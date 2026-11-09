import { memo, useMemo, ViewTransition } from "react";
import type { CSSProperties, ReactNode } from "react";
import styles from "./GridItem.module.css";

type Props = {
  children: ReactNode;
  desktopSpan: number;
  tabletSpan: number;
  mobileSpan: number;
};

export const GridItem = memo(function GridItem({
  children,
  desktopSpan,
  tabletSpan,
  mobileSpan,
}: Props) {
  const style: CSSProperties & Record<`--${string}`, number> = useMemo(
    () => ({ "--span": desktopSpan, "--tablet-span": tabletSpan, "--mobile-span": mobileSpan }),
    [desktopSpan, tabletSpan, mobileSpan],
  );
  return (
    <ViewTransition default="catalog-card" enter="card-enter" exit="card-exit" update="card-update">
      <li className={styles["item"]} style={style}>
        {children}
      </li>
    </ViewTransition>
  );
});
