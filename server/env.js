import dotenv from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

const root = process.cwd();
const envFiles = [".env.local", ".env"];

for (const file of envFiles) {
  const envPath = resolve(root, file);
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

export function getApiKey() {
  return process.env.VITE_API_KEY || process.env.NEWS_API_KEY || "";
}

export function requireApiKey() {
  const apiKey = getApiKey();

  if (!apiKey || apiKey === "your_newsapi_key_here") {
    throw new Error(
      "Missing API key. Copy .env.example to .env and set VITE_API_KEY with your NewsAPI key from https://newsapi.org/register"
    );
  }

  return apiKey;
}
