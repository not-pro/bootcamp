import { useLayoutEffect, useRef } from "react";
import { positionMenu } from "./positionMenu";
import type { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
import styles from "./Options.module.css";

type Props = {
  menuId: string;
  label: string;
  open: boolean;
  options: readonly { value: string; label: string }[];
  value: readonly string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  onBlur: FocusEventHandler<HTMLElement>;
};

export function Options({
  options,
  value,
  onChange,
  onKeyDown,
  onBlur,
  menuId,
  label,
  open,
}: Props) {
  const menuRef = useRef<HTMLFieldSetElement>(null);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!open || !menu) return undefined;
    const update = () => positionMenu(menu);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  return (
    <fieldset
      ref={menuRef}
      id={menuId}
      className={styles["menu"]}
      aria-label={label}
      hidden={!open}
    >
      {options.map((option) => (
        <label className={styles["option"]} key={option.value}>
          <input
            type="checkbox"
            tabIndex={0}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}
