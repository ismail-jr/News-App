import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createNewsProxyHandler } from "./server/newsProxy.js";
import { getApiKey } from "./server/env.js";

function newsApiProxyPlugin() {
  const attachProxy = (server) => {
    server.middlewares.use("/api/news", createNewsProxyHandler());
  };

  return {
    name: "news-api-proxy",
    configureServer(server) {
      attachProxy(server);

      const apiKey = getApiKey();
      if (!apiKey || apiKey === "your_newsapi_key_here") {
        server.config.logger.warn(
          "\n  VITE_API_KEY is missing. Copy .env.example to .env and add your NewsAPI key.\n"
        );
      }
    },
    configurePreviewServer: attachProxy,
  };
}

export default defineConfig({
  plugins: [react(), newsApiProxyPlugin()],
});
