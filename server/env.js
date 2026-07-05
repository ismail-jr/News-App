import dotenv from "dotenv";
import { existsSync } from "fs";
import { resolve } from "path";

const PLACEHOLDER = "your_newsapi_key_here";
const root = process.cwd();
const envFiles = [".env.local", ".env"];

for (const file of envFiles) {
  const envPath = resolve(root, file);
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

function normalizeKey(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function getApiKeyFromSource(source = process.env) {
  return (
    normalizeKey(source.NEWS_KEY) ||
    normalizeKey(source.VITE_API_KEY) ||
    normalizeKey(source.NEWS_API_KEY) ||
    ""
  );
}

export function getApiKey() {
  return getApiKeyFromSource(process.env);
}

export function isPlaceholderKey(apiKey) {
  return !apiKey || apiKey === PLACEHOLDER;
}

export function getRequiredApiKey() {
  const apiKey = getApiKey();

  if (isPlaceholderKey(apiKey)) {
    throw new Error(
      "Missing API key. Copy .env.example to .env and set NEWS_KEY with your NewsAPI key from https://newsapi.org/register"
    );
  }

  return apiKey;
}
