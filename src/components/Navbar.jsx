import React from "react";
import PropTypes from "prop-types";

function Navbar({ setCategory }) {
  return (
    <nav
      className="navbar navbar-expand-lg "
      style={{ backgroundColor: "#051e58", color: "#FFFFFF" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className="badge bg-light text-dark fs-4">World News</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setCategory("technology")}
                style={{ fontWeight: "700", color: "white" }}
              >
                Technology
              </div>
            </li>
            <li className="nav-item ">
              <div
                className="nav-link"
                onClick={() => setCategory("business")}
                style={{ fontWeight: "700", color: "white" }}
              >
                Business
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setCategory("health")}
                style={{ fontWeight: "700", color: "white" }}
              >
                Health
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setCategory("sports")}
                style={{ fontWeight: "700", color: "white" }}
              >
                Sports
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setCategory("science")}
                style={{ fontWeight: "700", color: "white" }}
              >
                Science
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setCategory("entertainment")}
                style={{ fontWeight: "700", color: "white" }}
              >
                Entertainment
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  setCategory: PropTypes.func.isRequired,
};

export default Navbar;
