import { useEffect, useRef, useState } from "react";

export function useMultiSelectOpen() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return { open, setOpen, rootRef };
}
