import type { FocusEventHandler, KeyboardEventHandler, RefObject } from "react";
import styles from "./Trigger.module.css";

type Props = {
  triggerRef: RefObject<HTMLButtonElement | null>;
  label: string;
  options: readonly { value: string; label: string }[];
  value: readonly string[];
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
  options,
  value,
  disabled,
  open,
  menuId,
  onClick,
  onKeyDown,
  onBlur,
}: Props) {
  const selectedLabels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  const displayText = selectedLabels.length > 0 ? selectedLabels.join(", ") : label;

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
      {displayText}
      {value.length > 0 && <span className={styles["count"]}> ({value.length})</span>}
      <span aria-hidden="true" className={styles["chevron"]}>
        ⌄
      </span>
    </button>
  );
}
