import { Card } from "@ui-kit/card/Card";
import type { Show } from "../../show";
import { usePresenter } from "./usePresenter";

type ShowCardProps = { show: Show; onOpen: (show: Show) => void };

export function ShowCard({ show, onOpen }: ShowCardProps) {
  const presenter = usePresenter(show, onOpen);
  return (
    <Card
      title={show.title}
      image={show.image}
      eyebrow={presenter.eyebrow}
      meta={presenter.meta}
      description={show.description}
      onClick={presenter.open}
    />
  );
}
