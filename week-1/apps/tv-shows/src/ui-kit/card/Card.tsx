import { memo } from "react";
import type { CardProps } from "./types";
import styles from "./Card.module.css";
import contentStyles from "./CardContent.module.css";

export type { CardProps } from "./types";

/**
 * Карточка с нативной кнопкой; поддерживает активацию Enter и Space.
 * @example
 * <Card title="Сериал" image="/poster.jpg" onClick={openDetails} />
 */
export const Card = memo(function Card({
  title,
  image,
  imageAlt = "",
  eyebrow,
  description,
  meta,
  onClick,
  disabled,
}: CardProps) {
  const label = [title, meta].filter(Boolean).join(", ");
  return (
    <button
      className={styles["card"]}
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <img
        className={styles["image"]}
        src={image}
        alt={imageAlt}
        decoding="async"
        draggable={false}
      />
      <span className={styles["overlay"]} />
      <span className={contentStyles["content"]}>
        {eyebrow && <span className={contentStyles["eyebrow"]}>{eyebrow}</span>}
        <span className={contentStyles["title"]}>{title}</span>
        {description && <span className={contentStyles["description"]}>{description}</span>}
        {meta && <span className={contentStyles["meta"]}>{meta}</span>}
      </span>
    </button>
  );
});
