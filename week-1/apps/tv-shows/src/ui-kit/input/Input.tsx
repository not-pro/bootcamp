import { useId } from "react";
import type { InputProps } from "./types";
import styles from "./Input.module.css";

export type { InputProps } from "./types";

/**
 * Поле ввода с доступной подписью и нативным API input.
 * @example
 * <Input label="Поиск" value={query} onChange={onQueryChange} type="search" />
 */
export function Input({ label, visuallyHiddenLabel, id, type, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles["field"]}>
      <label className={visuallyHiddenLabel ? styles["hidden"] : styles["label"]} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles["control"]}>
        {type === "search" && (
          <svg className={styles["icon"]} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        <input {...props} id={inputId} type={type} />
      </div>
    </div>
  );
}
