import type { ReactNode } from "react";

/** Параметры корневого макета приложения. */
export type AppLayoutProps = {
  /** Отключает взаимодействие с компонентом. По умолчанию false. */
  disabled?: boolean;
  /** Содержимое единственной основной области страницы. */
  children: ReactNode;
};
