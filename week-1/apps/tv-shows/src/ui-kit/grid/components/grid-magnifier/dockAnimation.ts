import { waapi } from "animejs/waapi";
import type { Layer } from "./types";
export const DOCK_DURATION = 240;
export function dockAnimation(layer: Layer, transform: string, opacity: number, fresh = false) {
  layer.animation?.cancel();
  const from = fresh ? layer.baseTransform : layer.node.style.transform || layer.baseTransform;
  const alpha = fresh ? "0" : layer.node.style.opacity || "1";
  layer.node.style.transform = transform;
  layer.node.style.opacity = String(opacity);
  layer.node.hidden = false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    layer.node.hidden = opacity === 0;
    return;
  }
  layer.animation = waapi.animate(layer.node, {
    transform: [from, transform],
    opacity: [alpha, String(opacity)],
    duration: DOCK_DURATION,
    ease: "cubic-bezier(.22,1,.36,1)",
    onComplete: () => {
      layer.node.hidden = opacity === 0;
    },
  });
}
