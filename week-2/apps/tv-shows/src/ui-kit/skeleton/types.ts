import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

/** Нативные props span (className, style и др.) плюс параметры заглушки. */
export type SkeletonProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  /** Останавливает анимацию заглушки. По умолчанию false. */
  disabled?: boolean;
  /** Показывать заглушку вместо children. По умолчанию true. */
  isLoading?: boolean;
  /** Содержимое после загрузки. При загрузке оно размонтируется. */
  children?: ReactNode;
  /** Ширина: число в px или CSS-значение. По умолчанию "100%". */
  width?: CSSProperties["width"];
  /** Высота: число в px или CSS-значение. По умолчанию "1em". */
  height?: CSSProperties["height"];
  /** Радиус: число в px или CSS-значение; "50%" для круга. По умолчанию 8. */
  borderRadius?: CSSProperties["borderRadius"];
};
