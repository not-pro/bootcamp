import { Card } from "@ui-kit/card/Card";
import type { CardShowProps } from "./types";
import { usePresenter } from "./hooks/usePresenter";
import styles from "./CardShow.module.css";

export function CardShow({ show }: CardShowProps) {
  const { currentSrc, originalSrc, isLoaded, onOriginalLoad, onClick, description, meta } =
    usePresenter(show);

  return (
    <div className={styles["wrapper"]}>
      {!isLoaded && originalSrc && (
        <img
          key={originalSrc}
          className={styles["loader"]}
          src={originalSrc}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={onOriginalLoad}
          aria-hidden="true"
        />
      )}
      <Card
        title={show.name}
        image={currentSrc}
        description={description}
        meta={meta}
        onClick={onClick}
      />
    </div>
  );
}
