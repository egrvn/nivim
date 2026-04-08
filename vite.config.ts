import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const pagesBase = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}/` : "/";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.VITE_BASE_PATH || pagesBase,
  publicDir: "public/assets",
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 4173,
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "o-kompanii/index.html"),
        instructions: resolve(__dirname, "instrukcii/index.html"),
        supportAlias: resolve(__dirname, "podderjka/index.html"),
        blog: resolve(__dirname, "blog/index.html"),
        privacy: resolve(__dirname, "privacy-policy/index.html"),
        cart: resolve(__dirname, "cart/index.html"),
        contacts: resolve(__dirname, "kontakty/index.html"),
        notFound: resolve(__dirname, "404.html"),
      },
    },
  },
});
