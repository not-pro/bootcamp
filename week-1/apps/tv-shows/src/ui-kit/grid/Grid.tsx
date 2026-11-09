import { Children } from "react";
import type { GridPaginationProps, GridProps } from "./types";
import { GridViewport } from "./components/grid-viewport/GridViewport";
import { useGridPagination } from "./hooks/useGridPagination";
import styles from "./Grid.module.css";
// Global ViewTransition classes must be registered for grid animations.
// oxlint-disable-next-line import/no-unassigned-import
import "./GridMotion.css";

export type { GridPaginationProps, GridProps };

/**
 * Сетка отображает все children; пагинация уведомляет внешнюю логику без изменения данных.
 * @example
 * <Grid label="Сериалы" pagination={pagination}>{cards}</Grid>
 */
export function Grid({ children, label = "Карточки", pagination, disabled }: GridProps) {
  const items = Children.toArray(children);
  const { list, change } = useGridPagination(pagination, disabled);
  return (
    <GridViewport
      className={styles["root"]}
      label={label}
      disabled={disabled}
      items={items}
      pagination={pagination}
      list={list}
      change={change}
      isPending={pagination?.isLoading ?? false}
    />
  );
}
