export function positionMenu(menu: HTMLElement) {
  const anchor = menu.parentElement?.getBoundingClientRect();
  if (!anchor) return;
  const gutter = 20;
  const gap = 8;
  const width = Math.max(0, Math.min(240, window.innerWidth - gutter * 2));
  menu.style.width = `${width}px`;
  menu.style.maxHeight = "280px";
  const height = menu.scrollHeight;
  const below = Math.max(0, window.innerHeight - anchor.bottom - gap - gutter);
  const above = Math.max(0, anchor.top - gap - gutter);
  const placeAbove = below < Math.min(height, 280) && above > below;
  const available = placeAbove ? above : below;
  const visibleHeight = Math.min(height, 280, available);
  menu.style.maxHeight = `${available}px`;
  menu.style.left = `${Math.max(gutter, Math.min(anchor.left, window.innerWidth - gutter - width))}px`;
  menu.style.top = `${placeAbove ? anchor.top - gap - visibleHeight : anchor.bottom + gap}px`;
}
