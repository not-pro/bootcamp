import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "@pages/home-page/home-page";
import { AppLayout } from "@ui-kit/app-layout/AppLayout";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <StrictMode>
    <AppLayout>
      <HomePage />
    </AppLayout>
  </StrictMode>,
);
