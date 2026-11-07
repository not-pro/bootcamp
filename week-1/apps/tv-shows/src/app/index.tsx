import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import styles from "./App.module.css";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <main className={styles["app"]}>
      <h1>TV shows</h1>
      <input type="text" placeholder="Search..." />
    </main>
  </StrictMode>,
);
