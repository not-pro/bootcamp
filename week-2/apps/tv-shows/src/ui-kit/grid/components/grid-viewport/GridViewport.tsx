import { useId } from "react";
import type { ReactNode, RefObject } from "react";
import type { GridPaginationProps } from "../../Grid";
import { GridGestureRegion } from "../grid-gesture-region/GridGestureRegion";
import { GridList } from "../grid-list/GridList";
import styles from "./GridViewport.module.css";

interface Props {
  disabled: boolean | undefined;
  className: string | undefined;
  label: string;
  isPending: boolean;
  items: ReactNode[];
  pagination: GridPaginationProps | undefined;
  list: RefObject<HTMLUListElement | null>;
  change: (direction: number) => void;
}
export function GridViewport({
  className,
  disabled,
  label,
  items,
  pagination,
  list,
  change,
  isPending,
}: Props) {
  const instructionsId = useId();
  return (
    <section className={`${styles["root"]} ${className ?? ""}`} aria-label={label} inert={disabled}>
      <p id={instructionsId} className={styles["hint"]}>
        {pagination?.totalCount !== undefined &&
          `Показано ${items.length} из ${pagination.totalCount} · `}
        {pagination?.isLoading
          ? "Загрузка…"
          : pagination?.hasNextPage
            ? "Прокручивайте вниз, чтобы увидеть больше сериалов ↓"
            : pagination?.hasPreviousPage
              ? "Прокручивайте вверх, чтобы вернуться ↑"
              : "Все доступные истории показаны"}
        <span className={styles["instructions"]}>
          {pagination && "Page Down — следующая порция, Page Up — предыдущая. "}
          Стрелки, Home и End перемещают фокус между карточками.
        </span>
      </p>
      <span className={styles["instructions"]} aria-live="polite">
        Показано {items.length}
        {pagination?.totalCount !== undefined && ` из ${pagination.totalCount}`}
      </span>
      <GridGestureRegion
        label={label}
        instructionsId={instructionsId}
        change={change}
        isPending={isPending}
      >
        <GridList items={items} list={list} />
      </GridGestureRegion>
    </section>
  );
}
