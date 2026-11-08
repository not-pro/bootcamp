import type { MultiSelectProps } from "./types";
import { useId } from "react";
import { Trigger } from "./components/trigger/Trigger";
import { Options } from "./components/options/Options";
import { useMultiSelectOpen } from "./hooks/useMultiSelectOpen";
import { useMultiSelectHandlers } from "./hooks/useMultiSelectHandlers";
import styles from "./MultiSelect.module.css";

/**
 * Множественный выбор: стрелки/Home/End перемещают фокус, Escape закрывает меню.
 * @example
 * <MultiSelect label="Жанры" options={genres} value={selected} onChange={setSelected} />
 */
export function MultiSelect({ label, options, value, onChange, disabled }: MultiSelectProps) {
  const { open, setOpen, rootRef } = useMultiSelectOpen();
  const { triggerRef, toggle, onCheckboxChange, onBlur, onKeyDown } = useMultiSelectHandlers({
    value,
    onChange,
    open,
    setOpen,
    rootRef,
  });

  const menuId = useId();

  return (
    <fieldset className={styles["root"]} ref={rootRef} disabled={disabled}>
      <Trigger
        triggerRef={triggerRef}
        label={label}
        count={value.length}
        disabled={disabled}
        open={open}
        menuId={menuId}
        onClick={toggle}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
      <Options
        menuId={menuId}
        label={label}
        open={open}
        options={options}
        value={value}
        onChange={onCheckboxChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </fieldset>
  );
}
