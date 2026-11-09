import type { ButtonProps } from "./types";
import styles from "./Button.module.css";

export type { ButtonProps } from "./types";

export function Button({ children, type = "button", className, ...props }: ButtonProps) {
  return (
    <button type={type} className={`${styles["button"]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}
