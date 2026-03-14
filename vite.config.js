import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const baseFromEnv = process.env.VITE_BASE_PATH;
const pagesBase = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  base: baseFromEnv || pagesBase,
  plugins: [react()],
  server: {
    host: true,
    port: 4173,
  },
});
