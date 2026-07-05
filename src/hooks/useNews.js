import { useEffect, useState } from "react";

const API_URL = "/api/news";

export function useNews(category) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadNews() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          country: "us",
          category,
        });
        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || data.status === "error") {
          throw new Error(data.message || "Failed to load news");
        }

        const validArticles = (data.articles ?? []).filter(
          (article) => article?.title && article?.url
        );
        setArticles(validArticles);
      } catch (err) {
        if (err.name !== "AbortError") {
          setArticles([]);
          setError(err.message || "Something went wrong while loading news");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => controller.abort();
  }, [category]);

  return { articles, loading, error };
}
