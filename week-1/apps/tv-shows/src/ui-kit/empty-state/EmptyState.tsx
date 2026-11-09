import type { EmptyStateProps } from "./types";
import styles from "./EmptyState.module.css";

export type { EmptyStateProps } from "./types";

/**
 * Сообщение о пустом результате с кнопкой сброса поиска и фильтров.
 * @example
 * <EmptyState title="Ничего не найдено" onReset={resetAll}>Измените поиск.</EmptyState>
 */
export function EmptyState({ title, children, action }: EmptyStateProps) {
  return (
    <section className={styles["empty"]} aria-live="polite">
      <span className={styles["symbol"]} aria-hidden="true">
        ↗
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </section>
  );
}
