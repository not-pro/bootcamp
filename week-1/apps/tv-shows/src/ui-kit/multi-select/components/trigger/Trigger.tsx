import type { FocusEventHandler, KeyboardEventHandler, RefObject } from "react";
import styles from "./Trigger.module.css";

type Props = {
  triggerRef: RefObject<HTMLButtonElement | null>;
  label: string;
  count: number;
  disabled: boolean | undefined;
  open: boolean;
  menuId: string;
  onClick: () => void;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
};

export function Trigger({
  triggerRef,
  label,
  count,
  disabled,
  open,
  menuId,
  onClick,
  onKeyDown,
  onBlur,
}: Props) {
  return (
    <button
      ref={triggerRef}
      type="button"
      tabIndex={0}
      className={styles["trigger"]}
      disabled={disabled}
      aria-expanded={open}
      aria-controls={menuId}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      {label}
      {count > 0 && <span className={styles["count"]}> {count}</span>}
      <span aria-hidden="true" className={styles["chevron"]}>
        ⌄
      </span>
    </button>
  );
}
