import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [search, setSearch] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) throw new Error("AuthContext must be used within AuthProvider");

  const { currentUser, logout, loading } = auth;

  const handleLogout = async () => {
    try {
      await logout();
      // currentUser will automatically update via AuthContext
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "#970747" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          The Everything Store
        </Link>

        <div className="collapse navbar-collapse">
          <form
            onSubmit={handleSearch}
            className="d-flex mx-auto"
            style={{ width: "50%" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-light" type="submit">
              Search
            </button>
          </form>

          <div className="d-flex align-items-center">
            <Link
              to="/cart"
              className="btn btn-light me-3 d-flex align-items-center"
            >
              <ShoppingCart />
              Cart
            </Link>

            {loading ? (
              <span className="text-white">Loading...</span>
            ) : currentUser ? (
              <>
                <span className="text-white me-2">Hi, {currentUser.name}</span>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
