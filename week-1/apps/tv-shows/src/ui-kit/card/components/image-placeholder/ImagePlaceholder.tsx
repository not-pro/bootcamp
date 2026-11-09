import styles from "./ImagePlaceholder.module.css";

export function ImagePlaceholder() {
  return (
    <span className={styles["placeholder"]} aria-hidden="true">
      <svg
        className={styles["drawing"]}
        viewBox="0 0 400 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path pathLength="1" d="m-20 410 96-84-51 27 142-109-80 43 183-141-107 68 195-139" />
        <path pathLength="1" d="M43 90q139 51 244 171t-87 10Q78 209 10 296" />
        <path pathLength="1" d="m430 395-111-81 48 53-161-110 95 97-182-139" />
        <path pathLength="1" d="m63 621 49-136-34 55 91-185-43 117 117-211-63 152 128-201" />
        <path pathLength="1" d="M-45 188q128-76 227 13t134-37 108 35" />
        <path pathLength="1" d="m7 492 128-53-72 45 190-71-117 62 224-69" />
        <path pathLength="1" d="M352-25q-89 147-57 218t-49 130q-87 62-33 139t-38 163" />
        <path pathLength="1" d="m-18 337 80-35-29 25 109-62-55 49 135-78-62 59 165-91" />
        <path pathLength="1" d="M-16 555q96-135 191-63t144-27 115 41" />
        <path pathLength="1" d="m27 38 79 112-38-75 114 151-51-97 139 178-65-116 155 180" />
      </svg>
    </span>
  );
}
