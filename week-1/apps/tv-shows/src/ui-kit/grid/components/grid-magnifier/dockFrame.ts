import { dockCells } from "./dockCells";
import { dockBox } from "./dockBox";
import { dockPlacement } from "./dockPlacement";
import { dockPreview } from "./dockPreview";
import { dockAnimation } from "./dockAnimation";
import { createLayer } from "./resetDock";
import type { Geometry, LensState } from "./types";
export function dockFrame(
  root: HTMLElement,
  list: HTMLElement,
  geometry: Geometry,
  state: LensState,
  clientX: number,
  clientY: number,
  focused?: number,
) {
  const bounds = (state.bounds ??= root.getBoundingClientRect());
  if (!bounds.width || !bounds.height) return;
  const { hot, cells, magnified } = dockCells(
    geometry,
    (clientX - bounds.left) / bounds.width,
    (clientY - bounds.top) / bounds.height,
    focused,
  );
  if (state.hot === hot) return;
  const started = import.meta.env.DEV ? performance.now() : 0;
  state.hot = hot;
  const baseBox = (index: number) => {
    const cached = state.boxes.get(index) ?? dockBox(geometry, index, bounds);
    state.boxes.set(index, cached);
    return cached;
  };
  const center = baseBox(hot);
  if (center.width <= 0 || center.height <= 0) return;
  const neighbors = cells.filter(({ index }) => index !== hot).map(({ index }) => index);
  while (state.layers.length < neighbors.length) state.layers.push(createLayer(state.preview));
  const free = state.layers.filter((layer) => !neighbors.includes(layer.index));
  const used = new Set();
  state.preview.hidden = false;
  state.preview.toggleAttribute("data-keyboard", focused !== undefined);
  for (const { index, step } of cells) {
    const source = list.children.item(index)?.firstElementChild;
    if (!source) continue;
    const primary = index === hot;
    const layer = primary
      ? state.primary
      : (state.layers.find((entry) => entry.index === index) ?? free.shift());
    if (!layer) continue;
    used.add(layer);
    const base = baseBox(index);
    const reference = dockPlacement(base, base, bounds, true, 0, magnified);
    const target = dockPlacement(base, center, bounds, primary, step, magnified);
    const fresh = layer.index !== index || Boolean(layer.node.hidden);
    layer.index = index;
    dockPreview(layer, source, base, primary);
    layer.node.style.width = `${reference.width}px`;
    layer.node.style.height = `${reference.height}px`;
    layer.node.style.zIndex = String(target.z);
    layer.baseTransform = `translate3d(${base.x}px,${base.y}px,0) scale(${base.width / reference.width},${base.height / reference.height})`;
    const transform = `translate3d(${target.x}px,${target.y}px,0) scale(${target.width / reference.width},${target.height / reference.height})`;
    dockAnimation(layer, transform, 1, fresh);
  }
  for (const layer of state.layers)
    if (!used.has(layer) && layer.index !== -1) {
      dockAnimation(layer, layer.baseTransform, 0);
      layer.index = -1;
    }
  if (import.meta.env.DEV) root.dataset["dockFrameMs"] = (performance.now() - started).toFixed(2);
}
