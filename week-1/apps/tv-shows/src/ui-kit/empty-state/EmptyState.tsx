import styles from "./EmptyState.module.css";

/** Параметры сообщения об отсутствии результатов. */
export type EmptyStateProps = {
  /** Заголовок пустого результата, выводится как h2. */
  title: string;
  /** Текст с объяснением или подсказкой пользователю. */
  children: string;
  /** Нажатие «Сбросить поиск и фильтры»; сам компонент данные не сбрасывает. */
  onReset: () => void;
};

/**
 * Сообщение о пустом результате с кнопкой сброса поиска и фильтров.
 * @example
 * <EmptyState title="Ничего не найдено" onReset={resetAll}>Измените поиск.</EmptyState>
 */
export function EmptyState({ title, children, onReset }: EmptyStateProps) {
  return (
    <section className={styles["empty"]} aria-live="polite">
      <span className={styles["symbol"]} aria-hidden="true">
        ↗
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
      <button type="button" tabIndex={0} onClick={onReset}>
        Сбросить поиск и фильтры
      </button>
    </section>
  );
}
