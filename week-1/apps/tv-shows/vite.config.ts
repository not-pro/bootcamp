import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@ui-kit": fileURLToPath(new URL("./src/ui-kit", import.meta.url)),
      "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
});
