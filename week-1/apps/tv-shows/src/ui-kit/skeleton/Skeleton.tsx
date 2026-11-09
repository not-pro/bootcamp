import type { SkeletonProps } from "./types";
import styles from "./Skeleton.module.css";

export type { SkeletonProps } from "./types";

/**
 * Универсальная декоративная заглушка без запросов и собственного состояния.
 * Размеры задаёт вызывающий код; для height="100%" нужна высота родителя.
 * Скрыта от скринридера: задайте aria-busy={isLoading} на области с данными.
 * Не оборачивайте сохраняемое состояние или фокус: children при загрузке удаляются.
 * Для сохранения содержимого при useTransition показывайте заглушку отдельно.
 * style имеет приоритет над width, height и borderRadius. Без анимации при reduced motion.
 * @example
 * <Skeleton isLoading={isPending} height={280} borderRadius={24}>
 *   <Card title={show.title} image={show.image} onClick={openDetails} />
 * </Skeleton>
 * @example
 * <Skeleton isLoading={isLoadingGenres} height={48} borderRadius={24}>
 *   <MultiSelect label="Жанры" options={genres} value={value} onChange={setValue} />
 * </Skeleton>
 */
export function Skeleton({
  isLoading = true,
  disabled,
  children,
  width = "100%",
  height = "1em",
  borderRadius = 8,
  className,
  style,
  ...props
}: SkeletonProps) {
  if (!isLoading) return children;

  return (
    <span
      {...props}
      className={`${styles["root"]} ${className ?? ""}`}
      // Native span has no memo boundary; style follows the supplied dimensions.
      // oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
      data-disabled={disabled}
    />
  );
}
