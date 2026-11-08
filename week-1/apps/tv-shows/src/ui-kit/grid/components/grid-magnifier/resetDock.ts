import { DOCK_DURATION, dockAnimation } from "./dockAnimation";
import type { Layer, LensState } from "./types";
import styles from "./GridMagnifier.module.css";
export function createLayer(preview: HTMLDivElement): Layer {
  const node = document.createElement("div");
  node.className = styles["layer"] ?? "";
  node.hidden = true;
  node.setAttribute("data-dock-layer", "");
  preview.append(node);
  return { node, source: null, index: -1, baseTransform: "none", animation: undefined };
}
export function createDockState(preview: HTMLDivElement): LensState {
  preview.replaceChildren();
  const primary = createLayer(preview);
  primary.node.setAttribute("data-dock-primary", "");
  return {
    layers: [],
    primary,
    boxes: new Map(),
    frame: 0,
    timer: undefined,
    hot: -1,
    preview,
    bounds: undefined,
  };
}
export function resetDock(state: LensState, immediate: boolean) {
  cancelAnimationFrame(state.frame);
  state.frame = 0;
  clearTimeout(state.timer);
  state.hot = -1;
  for (const layer of [...state.layers, state.primary]) {
    layer.source = null;
    if (layer.node.hidden) continue;
    if (immediate) {
      layer.animation?.cancel();
      layer.node.hidden = true;
    } else dockAnimation(layer, layer.baseTransform, 0);
  }
  if (immediate) state.preview.hidden = true;
  else
    state.timer = setTimeout(() => {
      state.preview.hidden = true;
    }, DOCK_DURATION + 20);
}
