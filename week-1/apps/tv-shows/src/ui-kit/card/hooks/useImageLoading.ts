import { useCallback, useState } from "react";

export function useImageLoading(image: string) {
  const [state, setState] = useState({ image, status: "loading" });

  if (state.image !== image) setState({ image, status: "loading" });

  const onLoad = useCallback(() => setState({ image, status: "loaded" }), [image]);
  const onError = useCallback(() => setState({ image, status: "error" }), [image]);
  const imageRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete) {
        setState({ image, status: node.naturalWidth > 0 ? "loaded" : "error" });
      }
    },
    [image],
  );

  return { status: state.status, imageRef, onLoad, onError };
}
