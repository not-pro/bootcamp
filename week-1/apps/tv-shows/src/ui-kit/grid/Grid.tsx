import { Children } from "react";
import type { ReactNode } from "react";
import { GridViewport } from "./components/grid-viewport/GridViewport";
import { useGridPagination } from "./hooks/useGridPagination";
import styles from "./Grid.module.css";
// Global ViewTransition classes must be registered for grid animations.
// oxlint-disable-next-line import/no-unassigned-import
import "./GridMotion.css";

/** Внешняя логика владеет данными, страницами и запросами. */
export interface GridPaginationProps {
  /** Разрешает колесо вниз, свайп вверх и PageDown для следующей порции данных. */
  hasNextPage: boolean;
  /** Доступен ли переход назад или уменьшение подборки. */
  hasPreviousPage: boolean;
  /** Блокирует оба callback и включает aria-busy. По умолчанию false. */
  isLoading?: boolean;
  /** Общее число результатов. Можно не передавать, если сервер его не сообщает. */
  totalCount?: number;
  /** Запрос следующей порции; Grid сам не меняет children. */
  onNextPage: () => void;
  /** Запрос предыдущей порции или уменьшения подборки. */
  onPreviousPage: () => void;
}

/** Параметры управляемой сетки карточек. */
export interface GridProps {
  /** Уже подготовленные для отображения карточки: страница или накопленный список. */
  children: ReactNode;
  /** Доступное имя сетки и области жестов. По умолчанию «Карточки». */
  label?: string;
  /** Без pagination отображаются все children, жесты пагинации отключены. */
  pagination?: GridPaginationProps;
}

/**
 * Сетка отображает все children; пагинация уведомляет внешнюю логику без изменения данных.
 * @example
 * <Grid label="Сериалы" pagination={pagination}>{cards}</Grid>
 */
export function Grid({ children, label = "Карточки", pagination }: GridProps) {
  const items = Children.toArray(children);
  const { list, change } = useGridPagination(pagination);
  return (
    <GridViewport
      className={styles["root"]}
      label={label}
      items={items}
      pagination={pagination}
      list={list}
      change={change}
      isPending={pagination?.isLoading ?? false}
    />
  );
}
