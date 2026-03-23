import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";

const build = spawnSync(process.execPath, [path.join(__dirname, "build-static-site.mjs")], {
  cwd: rootDir,
  env: {
    ...process.env,
    VITE_BASE_PATH: "/",
  },
  stdio: "inherit",
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${host}:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    const { filePath, statusCode } = await resolveFilePath(pathname);
    const content = await fs.readFile(filePath);
    response.writeHead(statusCode, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(content);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(String(error));
  }
});

server.listen(port, host, () => {
  console.log(`Static site preview: http://${host}:${port}/`);
});

function resolveFilePath(pathname) {
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;
  const candidate = path.join(distDir, normalizedPath.replace(/^\//, ""));

  if (normalizedPath.endsWith("/") || !path.extname(normalizedPath)) {
    const directoryIndex = path.join(candidate, "index.html");
    return fs
      .access(directoryIndex)
      .then(() => ({ filePath: directoryIndex, statusCode: 200 }))
      .catch(() => ({ filePath: path.join(distDir, "404.html"), statusCode: 404 }));
  }

  return fs
    .access(candidate)
    .then(() => ({ filePath: candidate, statusCode: 200 }))
    .catch(() => ({ filePath: path.join(distDir, "404.html"), statusCode: 404 }));
}
