import type { CatalogLayoutProps } from "./types";
import styles from "./CatalogLayout.module.css";

export type { CatalogLayoutProps } from "./types";

/**
 * Макет каталога с заголовком h1.
 * @example
 * <CatalogLayout title="Сериалы">{content}</CatalogLayout>
 */
export function CatalogLayout({ title, children, disabled }: CatalogLayoutProps) {
  return (
    <div className={styles["catalog"]} inert={disabled}>
      <h1 className={styles["title"]}>{title}</h1>
      {children}
    </div>
  );
}
