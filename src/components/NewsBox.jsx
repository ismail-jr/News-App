import NewsItem from "./NewsItem.jsx";
import { useNews } from "../hooks/useNews.js";

function NewsBox({ category }) {
  const { articles, loading, error } = useNews(category);
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <section>
      <header className="news-header text-center mb-4">
        <h1 className="news-title">
          {categoryLabel}{" "}
          <span className="badge news-badge">Headlines</span>
        </h1>
        <p className="news-subtitle text-muted">
          Top stories from the United States
        </p>
      </header>

      {loading && (
        <div className="state-panel" role="status" aria-live="polite">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading news...</span>
          </div>
          <p className="mt-3 mb-0">Loading latest headlines...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-panel alert alert-danger" role="alert">
          <h2 className="h5">Unable to load news</h2>
          <p className="mb-0">{error}</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="state-panel alert alert-warning" role="status">
          <p className="mb-0">No articles found for this category.</p>
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="news-grid">
          {articles.map((article) => (
            <NewsItem
              key={article.url}
              title={article.title}
              description={article.description}
              image={article.urlToImage}
              url={article.url}
              source={article.source?.name}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default NewsBox;
