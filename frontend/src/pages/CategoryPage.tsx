import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Categories from "../components/categories";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import image1 from "../assets/productImages/b4f62806-2428-460c-8e3e-c79eb573d1e5.jpg";

type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  tag?: string;
};

type CategoryParams = {
  categoryName: string;
};

function CategoryPage() {
  const { categoryName = "spices" } = useParams<CategoryParams>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tag = categoryName.toLowerCase().replace(/-/g, " ");
        const res = await axios.get<Product[]>(
          `http://localhost:4500/backend/products/category/${tag}`
        );

        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch category products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {/* Sticky Sidebar */}
          <div
            className="col-md-3 col-lg-2 d-none d-md-block p-0"
            style={{
              position: "sticky",
              top: "70px",
              height: "calc(100vh - 70px)",
              overflowY: "auto",
            }}
          >
            <Categories />
          </div>

          {/* Products */}
          <div className="col-md-9 col-lg-10 p-4">
            <h3 className="text-capitalize mb-4" style={{ color: "#970747" }}>
              {categoryName.replace(/-/g, " ")}
            </h3>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              <div className="row g-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-4"
                  >
                    <div className="card h-100 border">
                      <div className="card-body p-4 text-center">
                        <img
                          src={product.image_url || image1}
                          className="img-fluid mb-3"
                          alt={product.name}
                          style={{ maxHeight: "200px" }}
                        />
                        <h5 className="card-title mb-2">{product.name}</h5>
                        <p className="card-text mb-3">
                          {product.description?.slice(0, 60) ||
                            "No description"}
                        </p>
                        <p className="fw-bold mb-3">Rs. {product.price}</p>
                        <Link to={`/product/${product.id}`}>
                          <button
                            className="btn btn-primary w-100"
                            style={{
                              backgroundColor: "#970747",
                              borderColor: "#970747",
                            }}
                          >
                            View Product
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
