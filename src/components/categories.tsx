import { Link } from "react-router-dom";

function Categories() {
  const categoryList = ["Spices", "Herbs", "Oils", "Tea", "Dry Fruits"];

  return (
    <div
      className="bg-light p-3 h-100 overflow-auto border-end"
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <h5 className="fw-bold mb-3">Categories</h5>
      <ul className="list-unstyled">
        {categoryList.map((cat, index) => (
          <li key={index} className="mb-2 border-bottom pb-2">
            <Link
              to={`/category/${cat.toLowerCase()}`}
              className="text-decoration-none text-dark"
            >
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
