import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { getApiKeyFromSource, isPlaceholderKey } from "./server/env.js";

const NEWS_API_BASE = "https://newsapi.org/v2/top-headlines";

function createDevProxyHandler(getKey) {
  return async (req, res) => {
    try {
      const apiKey = getKey();

      if (isPlaceholderKey(apiKey)) {
        throw new Error(
          "Missing API key. Copy .env.example to .env and set NEWS_KEY with your NewsAPI key from https://newsapi.org/register"
        );
      }

      const url = new URL(req.url, "http://localhost");
      url.searchParams.set("apiKey", apiKey);

      const response = await fetch(`${NEWS_API_BASE}?${url.searchParams.toString()}`);

      if (!response.ok) {
        throw new Error(`News API request failed (${response.status})`);
      }

      const data = await response.json();

      if (data.status === "error") {
        throw new Error(data.message || "News API returned an error");
      }

      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: "error", message: error.message }));
    }
  };
}

function newsApiProxyPlugin(env) {
  const getKey = () => getApiKeyFromSource(env);
  const handler = createDevProxyHandler(getKey);

  const attachProxy = (server) => {
    server.middlewares.use("/api/news", handler);

    if (isPlaceholderKey(getKey())) {
      server.config.logger.warn(
        "\n  NEWS_KEY is missing. Copy .env.example to .env and add your NewsAPI key.\n"
      );
    }
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
    plugins: [react(), newsApiProxyPlugin(env)],
  };
});
