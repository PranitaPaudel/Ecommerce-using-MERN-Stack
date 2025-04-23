import { useParams, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Categories from "../components/categories";
import Footer from "../components/footer";
import ProductCard from "../components/ProductCards";
import { useEffect, useState } from "react";
import image1 from "../assets/productImages/b4f62806-2428-460c-8e3e-c79eb573d1e5.jpg";

type Product = {
  name: string;
  price: number;
};

type CategoryParams = {
  categoryName: string;
};

function CategoryPage() {
  const { categoryName = "spices" } = useParams<CategoryParams>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const dummyProducts: Record<string, Product[]> = {
      spices: [
        { name: "Garam Masala", price: 100 },
        { name: "Turmeric Powder", price: 80 },
      ],
      herbs: [{ name: "Basil", price: 50 }],
      oils: [{ name: "Mustard Oil", price: 120 }],
      tea: [{ name: "Green Tea", price: 90 }],
      "dry fruits": [{ name: "Cashew", price: 250 }],
    };

    if (categoryName) {
      const key = categoryName.toLowerCase();
      setProducts(dummyProducts[key] || []);
    }
  }, [categoryName]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-lg-2 d-none d-md-block p-0">
            <Categories />
          </div>
          <div className="col-md-9 col-lg-10 p-4">
            <h3 className="text-capitalize mb-4" style={{ color: "#970747" }}>
              {categoryName}
            </h3>
            <div className="row g-4">
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <div
                    key={idx}
                    className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4"
                  >
                    <div className="card h-100 border">
                      <div className="card-body p-4 text-center">
                        <img
                          src={image1}
                          className="img-fluid mb-3"
                          alt={product.name}
                          style={{ maxHeight: "200px" }}
                        />
                        <h5 className="card-title mb-2">{product.name}</h5>
                        <p className="card-text mb-3">
                          This is a short description of {product.name}.
                        </p>
                        <p className="fw-bold mb-3">Rs.{product.price}</p>
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
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
