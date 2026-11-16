import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "@pages/home-page/home-page";
import { AppLayout } from "@ui-kit/app-layout/AppLayout";
import { setupBaseUrl } from "useQuery";
import { BASE_URL_API } from "@config/const";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

setupBaseUrl(BASE_URL_API);
createRoot(root).render(
  <StrictMode>
    <AppLayout>
      <HomePage />
    </AppLayout>
  </StrictMode>,
);
