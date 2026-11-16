import type { ReactNode } from "react";

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
  /** Отключает взаимодействие с компонентом. По умолчанию false. */
  disabled?: boolean;
  /** Уже подготовленные для отображения карточки: страница или накопленный список. */
  children: ReactNode;
  /** Доступное имя сетки и области жестов. По умолчанию «Карточки». */
  label?: string;
  /** Без pagination отображаются все children, жесты пагинации отключены. */
  pagination?: GridPaginationProps;
}
