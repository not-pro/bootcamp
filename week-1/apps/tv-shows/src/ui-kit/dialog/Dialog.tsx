import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./Dialog.module.css";

/** Параметры управляемого модального окна. */
export type DialogProps = {
  /** Видимый заголовок h2 и доступное имя диалога. */
  title: string;
  /** Управляемая видимость: true вызывает showModal(), false — close(). */
  open: boolean;
  /** Нативное событие закрытия, включая Escape и кнопку ×; установите open=false. */
  onClose: () => void;
  /** Произвольное содержимое под заголовком. */
  children: ReactNode;
};

/**
 * Нативный модальный dialog; браузер управляет фокусом и Escape.
 * @example
 * <Dialog title="Описание" open={open} onClose={closeDetails}>{details}</Dialog>
 */
export function Dialog({ title, open, onClose, children }: DialogProps) {
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
          <button autoFocus aria-label="Закрыть описание">
            ×
          </button>
        </form>
      </div>
      <div className={styles["body"]}>{children}</div>
    </dialog>
  );
}
