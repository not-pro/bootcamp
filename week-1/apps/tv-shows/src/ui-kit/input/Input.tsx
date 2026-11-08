import { useId } from "react";
import type { ComponentPropsWithRef } from "react";
import styles from "./Input.module.css";

/**
 * Нативные props input, включая value/onChange, defaultValue, disabled и ref.
 * Без id создаётся уникальный id для связи с label; type="search" добавляет иконку.
 * className и style применяются к самому input. Управление значением — снаружи.
 */
export type InputProps = ComponentPropsWithRef<"input"> & {
  /** Обязательная подпись поля; placeholder её не заменяет. */
  label: string;
  /** Скрывает подпись визуально, сохраняя её для скринридера. По умолчанию false. */
  visuallyHiddenLabel?: boolean;
};

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
