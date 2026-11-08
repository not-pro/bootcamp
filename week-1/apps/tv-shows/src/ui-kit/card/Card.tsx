import { memo } from "react";
import styles from "./Card.module.css";
import contentStyles from "./CardContent.module.css";

/** Параметры карточки-кнопки; данные и действие задаёт вызывающий код. */
export type CardProps = {
  /** Название; также входит в доступное имя кнопки и нативную подсказку. */
  title: string;
  /** URL постера, передаётся в src изображения. */
  image: string;
  /** Описание изображения для скринридера. По умолчанию "": постер декоративный. */
  imageAlt?: string;
  /** Необязательная короткая надпись над названием. */
  eyebrow?: string;
  /** Необязательное описание под названием. */
  description?: string;
  /** Дополнительные сведения; также входят в доступное имя и подсказку. */
  meta?: string;
  /** Нажатие карточки мышью или клавиатурой; например, открытие подробностей. */
  onClick: () => void;
};

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
}: CardProps) {
  const label = [title, meta].filter(Boolean).join(", ");
  return (
    <button
      className={styles["card"]}
      type="button"
      tabIndex={0}
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
