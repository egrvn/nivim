import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createRenderer } from "../site-src/templates/site-renderer.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const publicAssetsDir = path.join(rootDir, "public", "assets");
const stylesDir = path.join(rootDir, "site-src", "styles");
const scriptsDir = path.join(rootDir, "site-src", "scripts");

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const basePath = normalizeBase(
  process.env.VITE_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}/` : "/"),
);

const renderer = createRenderer(basePath);

await fs.rm(distDir, { force: true, recursive: true });
await fs.mkdir(distDir, { recursive: true });
await fs.cp(publicAssetsDir, path.join(distDir, "assets"), { recursive: true });
await fs.cp(stylesDir, path.join(distDir, "styles"), { recursive: true });
await fs.cp(scriptsDir, path.join(distDir, "scripts"), { recursive: true });

for (const page of renderer.pages) {
  const html = renderer.renderPage(page);
  const outputPath = path.join(distDir, page.output);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
}

console.log(`Static site built to ${distDir} with base path ${basePath}`);

function normalizeBase(value) {
  if (!value || value === "/") {
    return "/";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}
