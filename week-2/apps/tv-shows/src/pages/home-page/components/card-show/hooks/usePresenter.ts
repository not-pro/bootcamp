import { useCallback, useMemo } from "react";
import type { Show } from "../types";

const PLACEHOLDER_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function usePresenter(show: Show) {
  const onClick = useCallback(() => {
    window.open(show.url, "_blank", "noopener,noreferrer");
  }, [show.url]);

  const meta = useMemo(() => {
    if (show.genres.length > 0) {
      return show.genres.join(", ");
    }
    if (show.rating.average != null) {
      return `Рейтинг ${show.rating.average}`;
    }
    return "";
  }, [show.genres, show.rating.average]);

  return {
    currentSrc: show.image?.original ?? show.image?.medium ?? PLACEHOLDER_IMAGE,
    onClick,
    meta,
  };
}
