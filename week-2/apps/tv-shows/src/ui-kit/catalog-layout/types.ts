import type { ReactNode } from "react";

/** Параметры макета каталога. */
export type CatalogLayoutProps = {
  /** Отключает взаимодействие с компонентом. По умолчанию false. */
  disabled?: boolean;
  /** Заголовок страницы, выводится как h1. */
  title: string;
  /** Поиск, фильтры и результаты в порядке отображения. */
  children: ReactNode;
};
