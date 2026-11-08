import type { Box } from "./types";
import { NEIGHBOR_GAIN, SMALL_SCALE, WAVE_DECAY } from "./dockConfig";

export function dockPlacement(
  base: Box,
  center: Box,
  bounds: DOMRect,
  primary: boolean,
  step = 0,
  magnified = true,
) {
  const dx = base.x + base.width / 2 - (center.x + center.width / 2);
  const dy = base.y + base.height / 2 - (center.y + center.height / 2);
  const weight = WAVE_DECAY ** step;
  const size = Math.min(center.width, center.height);
  const peakGain = magnified ? Math.min(110, 8200 / (size + 60)) / size : SMALL_SCALE - 1;
  const gain = peakGain * weight * (primary ? 1 : NEIGHBOR_GAIN);
  const primaryWidth = Math.min(bounds.width, center.width * (1 + peakGain));
  const primaryHeight = Math.min(bounds.height, center.height * (1 + peakGain));
  const limit = primary ? 1 : 0.9;
  const width = Math.min(primaryWidth * limit, base.width * (1 + gain));
  const height = Math.min(primaryHeight * limit, base.height * (1 + gain));
  const push = primary
    ? 0
    : Math.min(220, Math.max(center.width, center.height) * gain * 0.35 * step);
  const distance = Math.hypot(dx, dy) || 1;
  const x = Math.max(
    0,
    Math.min(bounds.width - width, base.x + (base.width - width) / 2 + (dx / distance) * push),
  );
  const y = Math.max(
    0,
    Math.min(bounds.height - height, base.y + (base.height - height) / 2 + (dy / distance) * push),
  );
  return {
    width,
    height,
    x,
    y,
    z: primary ? 1000 : 10 + Math.round(weight * 100),
  };
}
