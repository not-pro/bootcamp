import type { ComponentPropsWithRef } from "react";

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
