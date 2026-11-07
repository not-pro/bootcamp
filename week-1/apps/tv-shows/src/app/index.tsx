import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    {/* here will be layout component from ui-kit */}
    <div />
  </StrictMode>,
);
