import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem.jsx";

import PropTypes from "prop-types";

function NewsBox({ category }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles));
  }, [category]);

  return (
    <div>
      <h2 className="text-center py-5">
        World Latest{" "}
        <span className="badge " style={{ backgroundColor: "#051e58" }}>
          News
        </span>
      </h2>
      {articles.map((news, index) => {
        return (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        );
      })}
    </div>
  );
}

NewsBox.propTypes = {
  category: PropTypes.string.isRequired,
};

export default NewsBox;
