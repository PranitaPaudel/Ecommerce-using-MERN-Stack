import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Categories() {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<string[]>(
          "http://localhost:4500/backend/products/categories"
        );

        setCategoryList(res.data);
      } catch (err) {
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div
      className="bg-light h-100 overflow-auto border-end text-center p-3"
      style={{
        position: "sticky",
        top: "70px",
        height: "calc(100vh - 70px)",
        zIndex: 1,
      }}
    >
      <h5 className="fw-bold mb-4">Categories</h5>
      <ul className="list-unstyled">
        {categoryList.map((cat, index) => (
          <li key={index} className="mb-3 border-bottom pb-2">
            <Link
              to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-decoration-none text-dark d-block"
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
