/* The region handles PageUp/PageDown while retaining native section/list semantics. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
import type { ReactNode } from "react";
import { useGridWheel } from "./hooks/useGridWheel";
import { useGridTouch } from "./hooks/useGridTouch";
import { useGridKeyboard } from "./hooks/useGridKeyboard";
import styles from "./GridGestureRegion.module.css";
interface Props {
  label: string;
  isPending: boolean;
  instructionsId: string;
  change: (direction: number) => void;
  children: ReactNode;
}
export function GridGestureRegion({ label, instructionsId, change, children, isPending }: Props) {
  const { onWheel, transitionAt } = useGridWheel(change);
  const { onTouchStart, onTouchEnd } = useGridTouch(change, transitionAt);
  const onPage = useGridKeyboard(change);
  return (
    <section
      className={styles["viewport"]}
      tabIndex={0}
      aria-label={label}
      aria-busy={isPending}
      aria-describedby={instructionsId}
      onKeyDown={onPage}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </section>
  );
}
