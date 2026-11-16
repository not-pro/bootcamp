import { useCallback, useRef } from "react";
import type {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from "react";
import type { MultiSelectProps } from "../types";
import { focusInitial } from "../focusInitial";
import { moveFocus } from "../moveFocus";

type Props = Pick<MultiSelectProps, "value" | "onChange"> & {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rootRef: RefObject<HTMLFieldSetElement | null>;
};

export function useMultiSelectHandlers({ value, onChange, open, setOpen, rootRef }: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const toggle = useCallback(() => {
    setOpen((current) => !current);
  }, [setOpen]);
  const onCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selected = event.currentTarget.value;
      onChange(
        event.currentTarget.checked
          ? [...value, selected]
          : value.filter((item) => item !== selected),
      );
    },
    [value, onChange],
  );
  const onBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      if (!rootRef.current?.contains(event.relatedTarget)) setOpen(false);
    },
    [rootRef, setOpen],
  );
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        setOpen(true);
        focusInitial(rootRef, event.key === "ArrowUp");
        return;
      }
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (!open || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      moveFocus(rootRef.current, event.key);
    },
    [open, rootRef, setOpen],
  );

  return { triggerRef, toggle, onCheckboxChange, onBlur, onKeyDown };
}
