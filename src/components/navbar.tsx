import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
    setSearch("");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#970747" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          The Everything Store
        </Link>
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
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Centered Search Form */}
            <div className="flex-grow-1 d-flex justify-content-center">
              <form
                className="d-flex w-50"
                style={{ maxWidth: "600px" }}
                onSubmit={handleSearch}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search spices..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>
            {/* Navigation Links */}
            <div className="d-flex align-items-center">
              <Link to="/cart" className="btn btn-light me-2">
                Cart
              </Link>
              {isLoggedIn ? (
                <Link className="btn btn-outline-light" to="/profile">
                  Profile
                </Link>
              ) : (
                <Link className="btn btn-outline-light" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
