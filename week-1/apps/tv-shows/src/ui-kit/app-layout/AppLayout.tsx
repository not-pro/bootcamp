import type { AppLayoutProps } from "./types";
import styles from "./AppLayout.module.css";

export type { AppLayoutProps } from "./types";

/**
 * Корневой макет с темой и ссылкой перехода к main; размещайте один на страницу.
 * @example
 * <AppLayout><HomePage /></AppLayout>
 */
export function AppLayout({ children, disabled }: AppLayoutProps) {
  const mainId = "main-content";

  return (
    <div className={styles["layout"]} inert={disabled}>
      <a className={styles["skipLink"]} href={`#${mainId}`}>
        Перейти к сериалам
      </a>
      <main className={styles["main"]} id={mainId} tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
