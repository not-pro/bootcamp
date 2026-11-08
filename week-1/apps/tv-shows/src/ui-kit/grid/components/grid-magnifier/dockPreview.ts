import type { Box, Layer } from "./types";
import styles from "./GridMagnifier.module.css";
export function dockPreview(layer: Layer, source: Element, base: Box, primary: boolean) {
  if (layer.source === source) return;
  if (primary || (base.width > 140 && base.height > 140)) {
    const copy = source.cloneNode(true);
    if (!(copy instanceof HTMLElement)) return;
    copy.removeAttribute("id");
    for (const node of copy.querySelectorAll("[id]")) node.removeAttribute("id");
    layer.node.replaceChildren(copy);
  } else {
    const image = document.createElement("img");
    image.className = styles["image"] ?? "";
    image.alt = "";
    image.draggable = false;
    const original = source.querySelector("img");
    if (original) image.src = original.currentSrc || original.src;
    layer.node.replaceChildren(image);
  }
  layer.source = source;
}
