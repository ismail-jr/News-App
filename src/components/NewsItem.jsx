import imgi from "../assets/news.jpg";

import React from "react";
import PropTypes from "prop-types";

function NewsItem({ title, description, src, url }) {
  return (
    <div
      className="card bg-light text-dark mb-3 d-inline-block my-3 mx-3 py-2 px-2"
      style={{ maxWidth: "390px", marginLeft: "100px" }}
    >
      <img
        src={src ? src : imgi}
        style={{ width: "380px", height: "200px" }}
        alt=""
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 50)}</h5>
        <p className="card-text">
          {description
            ? description.slice(0, 90)
            : "This news do not have current description now, click read more button below."}
        </p>
        <a
          href={url}
          className="btn"
          style={{
            backgroundColor: "#051e58",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          Read More
        </a>
      </div>
    </div>
  );
}

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NewsItem;
