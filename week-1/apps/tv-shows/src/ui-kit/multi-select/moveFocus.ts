export function moveFocus(root: HTMLElement | null, key: string) {
  const inputs = Array.from(root?.querySelectorAll<HTMLInputElement>("input:not(:disabled)") ?? []);
  if (!inputs.length) return;
  const current =
    document.activeElement instanceof HTMLInputElement
      ? inputs.indexOf(document.activeElement)
      : -1;
  let next = current;
  if (key === "Home") next = 0;
  if (key === "End") next = inputs.length - 1;
  if (key === "ArrowDown") next = (current + 1) % inputs.length;
  if (key === "ArrowUp") next = (current <= 0 ? inputs.length : current) - 1;
  inputs[next]?.focus();
}
