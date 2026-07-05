import logo from "../assets/logo.svg";

function Navbar({ categories, activeCategory, onCategoryChange }) {
  const formatLabel = (category) =>
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
          <img src={logo} alt="" className="navbar-logo" width="40" height="40" />
          World News
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-1">
            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <button
                  type="button"
                  className={`nav-link category-link${
                    activeCategory === category ? " active" : ""
                  }`}
                  onClick={() => onCategoryChange(category)}
                  aria-current={activeCategory === category ? "page" : undefined}
                >
                  {formatLabel(category)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
