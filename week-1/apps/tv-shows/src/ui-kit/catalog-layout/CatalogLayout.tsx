import type { ReactNode } from "react";
import styles from "./CatalogLayout.module.css";

/** Параметры макета каталога. */
export type CatalogLayoutProps = {
  /** Заголовок страницы, выводится как h1. */
  title: string;
  /** Поиск, фильтры и результаты в порядке отображения. */
  children: ReactNode;
};

/**
 * Макет каталога с заголовком h1.
 * @example
 * <CatalogLayout title="Сериалы">{content}</CatalogLayout>
 */
export function CatalogLayout({ title, children }: CatalogLayoutProps) {
  return (
    <div className={styles["catalog"]}>
      <h1 className={styles["title"]}>{title}</h1>
      {children}
    </div>
  );
}
