import { useCallback, useState, type SyntheticEvent } from "react";
import type { Show } from "../types";

export const PLACEHOLDER_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function useProgressiveImage(image: Show["image"]) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const originalSrc = image?.original ?? null;
  const isLoaded = originalSrc !== null && loadedSrc === originalSrc;

  const onOriginalLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSrc(event.currentTarget.getAttribute("src"));
  }, []);

  return {
    currentSrc: (isLoaded ? originalSrc : image?.medium) ?? PLACEHOLDER_IMAGE,
    originalSrc,
    isLoaded,
    onOriginalLoad,
  };
}
