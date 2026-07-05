import fallbackImage from "../assets/news.jpg";

function NewsItem({ title, description, image, url, source }) {
  const displayTitle = title.length > 80 ? `${title.slice(0, 80)}...` : title;
  const displayDescription = description
    ? description.length > 120
      ? `${description.slice(0, 120)}...`
      : description
    : "No description available. Click below to read the full article.";

  return (
    <article className="card news-card h-100 shadow-sm">
      <img
        src={image || fallbackImage}
        alt={title}
        className="card-img-top news-card-image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="card-body d-flex flex-column">
        {source && <span className="news-source">{source}</span>}
        <h2 className="card-title h5">{displayTitle}</h2>
        <p className="card-text text-muted flex-grow-1">{displayDescription}</p>
        <a
          href={url}
          className="btn btn-primary news-read-more mt-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </div>
    </article>
  );
}

export default NewsItem;
