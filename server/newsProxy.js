const NEWS_API_BASE = "https://newsapi.org/v2/top-headlines";

export async function fetchNewsHeadlines(searchParams, apiKey) {
  if (!apiKey) {
    throw new Error("Missing NEWS_KEY.");
  }

  const params = new URLSearchParams(searchParams);
  params.set("apiKey", apiKey);

  const response = await fetch(`${NEWS_API_BASE}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`News API request failed (${response.status})`);
  }

  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.message || "News API returned an error");
  }

  return data;
}

export function createNewsProxyHandler(apiKey) {
  return async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      const data = await fetchNewsHeadlines(url.searchParams, apiKey);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ status: "error", message: error.message }));
    }
  };
}
