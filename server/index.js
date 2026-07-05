import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createNewsProxyHandler } from "./newsProxy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.VITE_API_KEY;

app.get("/api/news", createNewsProxyHandler(apiKey));
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`News app running at http://localhost:${port}`);
});
