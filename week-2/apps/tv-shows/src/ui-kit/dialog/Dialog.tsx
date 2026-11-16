import { useEffect, useId, useRef } from "react";
import type { DialogProps } from "./types";
import styles from "./Dialog.module.css";

export type { DialogProps } from "./types";

/**
 * Нативный модальный dialog; браузер управляет фокусом и Escape.
 * @example
 * <Dialog title="Описание" open={open} onClose={closeDetails}>{details}</Dialog>
 */
export function Dialog({ title, open, onClose, children, disabled }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className={styles["dialog"]} aria-labelledby={titleId} onClose={onClose}>
      <div className={styles["header"]}>
        <h2 id={titleId}>{title}</h2>
        <form method="dialog">
          <button disabled={disabled} autoFocus aria-label="Закрыть описание">
            ×
          </button>
        </form>
      </div>
      <div className={styles["body"]} inert={disabled}>
        {children}
      </div>
    </dialog>
  );
}
