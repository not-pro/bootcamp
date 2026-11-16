import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    printWidth: 100,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
  },
  lint: {
    plugins: ["typescript", "react", "react-perf", "jsx-a11y", "import", "promise"],
    categories: { correctness: "error", suspicious: "error", perf: "error" },
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error", "react/react-in-jsx-scope": "off" },
    options: { typeAware: true, typeCheck: true },
  },
  run: { cache: true },
});
