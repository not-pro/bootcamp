import type { Show } from "../../show";

export function usePresenter(show: Show, onOpen: (show: Show) => void) {
  function open() {
    onOpen(show);
  }
  return {
    open,
    eyebrow: `${show.genre} · ${show.year}`,
    meta: `★ ${show.rating.toLocaleString("ru", { minimumFractionDigits: 1 })} · Подробнее ↗`,
  };
}
