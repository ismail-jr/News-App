import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createNewsProxyHandler } from "./server/newsProxy.js";

function newsApiProxyPlugin(apiKey) {
  const attachProxy = (server) => {
    server.middlewares.use("/api/news", createNewsProxyHandler(apiKey));
  };

  return {
    name: "news-api-proxy",
    configureServer: attachProxy,
    configurePreviewServer: attachProxy,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), newsApiProxyPlugin(env.VITE_API_KEY)],
  };
});
