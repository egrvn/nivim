import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteSourceDir = path.join(rootDir, "site-src", "pages");
const publicTildaDir = path.join(rootDir, "public", "tilda");

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const basePath = normalizeBase(
  process.env.VITE_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}/` : "/"),
);

const pages = [
  {
    route: "/",
    source: "home.html",
    output: "index.html",
  },
  {
    route: "/o-kompanii/",
    source: "about.html",
    output: path.join("o-kompanii", "index.html"),
  },
  {
    route: "/podderjka/",
    source: "support.html",
    output: path.join("podderjka", "index.html"),
  },
  {
    route: "/blog/",
    source: "blog.html",
    output: path.join("blog", "index.html"),
  },
  {
    route: "/privacy-policy/",
    source: "privacy.html",
    output: path.join("privacy-policy", "index.html"),
  },
  {
    route: "/404.html",
    source: "not-found.html",
    output: "404.html",
  },
];

const internalRouteMap = new Map([
  ["https://project22192116.tilda.ws/page120334076.html", pageUrl("/404.html")],
  ["https://project22192116.tilda.ws/privacy-policy", pageUrl("/privacy-policy/")],
  ["https://project22192116.tilda.ws/podderjka", pageUrl("/podderjka/")],
  ["https://project22192116.tilda.ws/o-kompanii", pageUrl("/o-kompanii/")],
  ["https://project22192116.tilda.ws/blog", pageUrl("/blog/")],
  ["https://project22192116.tilda.ws/", pageUrl("/")],
  ["https://project22192116.tilda.ws", pageUrl("/")],
]);

await fs.rm(distDir, { force: true, recursive: true });
await fs.mkdir(distDir, { recursive: true });
await fs.cp(publicTildaDir, path.join(distDir, "tilda"), { recursive: true });

for (const page of pages) {
  const sourceHtml = await fs.readFile(path.join(siteSourceDir, page.source), "utf8");
  const outputHtml = rewritePageHtml(sourceHtml);
  const outputPath = path.join(distDir, page.output);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, outputHtml);
}

console.log(`Static site built to ${distDir} with base path ${basePath}`);

function normalizeBase(value) {
  if (!value || value === "/") {
    return "/";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function pageUrl(route) {
  if (route === "/") {
    return basePath;
  }

  const cleanRoute = route.replace(/^\//, "");
  return `${basePath}${cleanRoute}`;
}

function rewritePageHtml(html) {
  let output = html;

  for (const [from, to] of internalRouteMap) {
    output = output.split(from).join(to);
  }

  output = output
    .replace(/href="\/privacy-policy"/g, `href="${pageUrl("/privacy-policy/")}"`)
    .replace(/href="privacy-policy"/g, `href="${pageUrl("/privacy-policy/")}"`)
    .replace(/href="\/podderjka"/g, `href="${pageUrl("/podderjka/")}"`)
    .replace(/href="\/o-kompanii"/g, `href="${pageUrl("/o-kompanii/")}"`)
    .replace(/href="\/blog"/g, `href="${pageUrl("/blog/")}"`)
    .replace(/href="\/"/g, `href="${pageUrl("/")}"`)
    .replace(/href='\/privacy-policy'/g, `href='${pageUrl("/privacy-policy/")}'`)
    .replace(/href='privacy-policy'/g, `href='${pageUrl("/privacy-policy/")}'`)
    .replace(/href='\/podderjka'/g, `href='${pageUrl("/podderjka/")}'`)
    .replace(/href='\/o-kompanii'/g, `href='${pageUrl("/o-kompanii/")}'`)
    .replace(/href='\/blog'/g, `href='${pageUrl("/blog/")}'`)
    .replace(/href='\/'/g, `href='${pageUrl("/")}'`);

  output = output
    .replaceAll(
      "https://neo.tildacdn.com/js/tilda-fallback-1.0.min.js",
      pageUrl("tilda/js/tilda-fallback-1.0.min.js"),
    )
    .replaceAll(
      "https://static.tildacdn.com/js/tilda-stat-1.0.min.js",
      pageUrl("tilda/js/tilda-stat-1.0.min.js"),
    )
    .replace(
      /https:\/\/static\.tildacdn\.com\/ws\/project22192116\/(tilda-blocks-page\d+\.min\.css)\?t=\d+/g,
      (_, file) => pageUrl(`tilda/css/${file}`),
    )
    .replace(
      /https:\/\/static\.tildacdn\.com\/ws\/project22192116\/(tilda-blocks-page\d+\.min\.js)\?t=\d+/g,
      (_, file) => pageUrl(`tilda/js/${file}`),
    )
    .replace(/https:\/\/static\.tildacdn\.com\/css\/([^"' )]+)/g, (_, file) => pageUrl(`tilda/css/${file}`))
    .replace(/https:\/\/static\.tildacdn\.com\/js\/([^"' )]+)/g, (_, file) => pageUrl(`tilda/js/${file}`))
    .replace(/https:\/\/static\.tildacdn\.com\/img\/([^"' )]+)/g, (_, file) => pageUrl(`tilda/images/${file}`))
    .replace(/https:\/\/static\.tildacdn\.com\/(tild[^"' )]+)\/([^"' )]+)/g, (_, directory, file) =>
      pageUrl(`tilda/images/${directory}__${file.toLowerCase()}`),
    );

  return output;
}
