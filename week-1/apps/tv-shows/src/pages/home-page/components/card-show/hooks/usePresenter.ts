import { useCallback, useMemo } from "react";
import { stripHtml } from "../stripHtml";
import { useProgressiveImage } from "./useProgressiveImage";
import type { Show } from "../types";

export function usePresenter(show: Show) {
  const { currentSrc, originalSrc, isLoaded, onOriginalLoad } = useProgressiveImage(show.image);
  const onClick = useCallback(() => {}, []);

  const description = useMemo(() => (show.summary ? stripHtml(show.summary) : ""), [show.summary]);

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
    currentSrc,
    originalSrc,
    isLoaded,
    onOriginalLoad,
    onClick,
    description,
    meta,
  };
}
