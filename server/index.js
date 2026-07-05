import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createNewsProxyHandler } from "./newsProxy.js";
import { getApiKey, isPlaceholderKey } from "./env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.get("/api/news", createNewsProxyHandler());
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  const apiKey = getApiKey();
  console.log(`News app running at http://localhost:${port}`);

  if (isPlaceholderKey(apiKey)) {
    console.warn(
      "\nWarning: NEWS_KEY is not set. Copy .env.example to .env and add your NewsAPI key.\n"
    );
  }
});
