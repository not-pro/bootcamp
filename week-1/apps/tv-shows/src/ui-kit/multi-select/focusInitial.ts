import type { RefObject } from "react";

export function focusInitial(root: RefObject<HTMLElement | null>, last: boolean) {
  requestAnimationFrame(() => {
    const inputs = root.current?.querySelectorAll<HTMLInputElement>("input:not(:disabled)");
    inputs?.[last ? inputs.length - 1 : 0]?.focus();
  });
}
