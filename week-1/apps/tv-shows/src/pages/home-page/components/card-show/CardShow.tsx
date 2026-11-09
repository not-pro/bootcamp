import { Card } from "@ui-kit/card/Card";
import type { CardShowProps } from "./types";
import { usePresenter } from "./hooks/usePresenter";
import styles from "./CardShow.module.css";

export function CardShow({ show }: CardShowProps) {
  const { currentSrc, onClick, meta } = usePresenter(show);

  return (
    <div className={styles["wrapper"]}>
      <Card title={show.name} image={currentSrc} meta={meta} onClick={onClick} />
    </div>
  );
}
