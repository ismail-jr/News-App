import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const NEWS_API_BASE = "https://newsapi.org/v2/top-headlines";

function getApiKey(env) {
  return env.VITE_API_KEY || env.NEWS_API_KEY || "";
}

function createDevProxyHandler(apiKey) {
  return async (req, res) => {
    try {
      if (!apiKey || apiKey === "your_newsapi_key_here") {
        throw new Error(
          "Missing API key. Copy .env.example to .env and set VITE_API_KEY with your NewsAPI key from https://newsapi.org/register"
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
  const apiKey = getApiKey(env);
  const handler = createDevProxyHandler(apiKey);

  const attachProxy = (server) => {
    server.middlewares.use("/api/news", handler);

    if (!apiKey || apiKey === "your_newsapi_key_here") {
      server.config.logger.warn(
        "\n  VITE_API_KEY is missing. Copy .env.example to .env and add your NewsAPI key.\n"
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
