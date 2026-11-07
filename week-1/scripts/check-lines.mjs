import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const ignored = new Set(["node_modules", "dist", ".git", ".vscode", ".zed"]);
const extensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);
const violations = [];

function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.name === "pnpm-lock.yaml") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      checkDirectory(path);
    } else if (entry.isFile() && extensions.has(extname(entry.name))) {
      const content = readFileSync(path, "utf8");
      const lines =
        content === "" ? 0 : content.split("\n").length - Number(content.endsWith("\n"));
      if (lines > 90) violations.push(`${relative(root, path)}: ${lines} lines`);
    }
  }
}

checkDirectory(root);
if (violations.length > 0) {
  console.error(`Files must not exceed 90 lines:\n${violations.join("\n")}`);
  process.exitCode = 1;
}
