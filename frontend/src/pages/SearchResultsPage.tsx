import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { Container, Spinner, Row, Col, Card } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const query = useQuery().get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4500/backend/search?q=${encodeURIComponent(query)}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h4>Search Results for "{query}"</h4>
        {loading ? (
          <Spinner animation="border" />
        ) : products.length === 0 ? (
          <p>No matching products found.</p>
        ) : (
          <Row className="g-4 mt-3">
            {products.map((product) => (
              <Col key={product.id} md={4}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.image_url || "/fallback.jpg"}
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {product.description?.slice(0, 60) || "No description"}
                    </Card.Text>
                    <p className="fw-bold">Rs. {product.price}</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      View Product
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default SearchResultsPage;
