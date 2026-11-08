import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

/** Параметры корневого макета приложения. */
export type AppLayoutProps = {
  /** Содержимое единственной основной области страницы. */
  children: ReactNode;
};

/**
 * Корневой макет с темой и ссылкой перехода к main; размещайте один на страницу.
 * @example
 * <AppLayout><HomePage /></AppLayout>
 */
export function AppLayout({ children }: AppLayoutProps) {
  const mainId = "main-content";

  return (
    <div className={styles["layout"]}>
      <a className={styles["skipLink"]} href={`#${mainId}`}>
        Перейти к сериалам
      </a>
      <main className={styles["main"]} id={mainId} tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
