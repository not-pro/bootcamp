import type { ReactNode } from "react";
import styles from "./Filters.module.css";

/** Параметры группы фильтров. */
export type FiltersProps = {
  /** Элементы управления фильтрами. Их значения контролирует вызывающий код. */
  children: ReactNode;
  /** Подпись группы; без значения legend не отображается. */
  legend?: string;
  /** Нажатие «Сбросить». Без обработчика кнопка не отображается. */
  onReset?: () => void;
};

/**
 * Семантическая группа фильтров с необязательной кнопкой сброса.
 * @example
 * <Filters legend="Фильтры" onReset={resetFilters}>{controls}</Filters>
 */
export function Filters({ children, legend, onReset }: FiltersProps) {
  return (
    <fieldset className={styles["filters"]}>
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
