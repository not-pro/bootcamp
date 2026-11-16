import type { FiltersProps } from "./types";
import styles from "./Filters.module.css";

export type { FiltersProps } from "./types";

/**
 * Семантическая группа фильтров с необязательной кнопкой сброса.
 * @example
 * <Filters legend="Фильтры" onReset={resetFilters}>{controls}</Filters>
 */
export function Filters({ children, legend, onReset, disabled }: FiltersProps) {
  return (
    <fieldset className={styles["filters"]} disabled={disabled}>
      {legend && <legend className={styles["legend"]}>{legend}</legend>}
      <div className={styles["content"]}>
        {children}
        {onReset && (
          <button className={styles["reset"]} type="button" tabIndex={0} onClick={onReset}>
            Сбросить
          </button>
        )}
      </div>
    </fieldset>
  );
}
