import React from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import image1 from "../assets/productImages/b4f62806-2428-460c-8e3e-c79eb573d1e5.jpg";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Product ID from URL:", id);

  const products = [
    {
      id: 1,
      title: "Organic Garam Masala",
      description:
        "A traditional blend of hand-picked spices. Perfect for curries, soups, and stews. 100% natural and preservative-free.",
      price: 5.99,
      rating: 4.5,
      features: ["Aromatic", "Locally Sourced", "No Artificial Flavors"],
      image: image1,
    },
    {
      id: 2,
      title: "Himalayan Pink Salt",
      description:
        "Mined from the heart of the Himalayas, this salt is rich in minerals and adds flavor to every dish.",
      price: 3.49,
      rating: 4.7,
      features: ["Mineral Rich", "Unrefined", "Gluten-Free"],
      image: image1,
    },
    {
      id: 3,
      title: "Turmeric Powder",
      description:
        "Golden yellow turmeric, sourced from organic farms. Great for health and culinary use.",
      price: 2.99,
      rating: 4.8,
      features: ["Anti-inflammatory", "Rich in Curcumin", "Vegan"],
      image: image1,
    },
    {
      id: 4,
      title: "Coriander Seeds",
      description:
        "Fragrant coriander seeds, sun-dried to preserve freshness and taste. A must-have for spice lovers.",
      price: 1.99,
      rating: 4.4,
      features: ["Sun-dried", "Natural Oils Intact", "Enhances Digestion"],
      image: image1,
    },
  ];
  console.log("Products array:", products);
  const product = products.find((p) => p.id === parseInt(id || "0"));
  console.log("Product found:", product);
  const similarProducts = products
    .filter((p) => p.id !== product?.id)
    .slice(0, 3);

  if (!product) {
    return <Container className="mt-5">Product not found.</Container>;
  }

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <Row>
          <Col md={5}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Col>
          <Col md={7}>
            <h3>{product.title}</h3>
            <p>
              <strong>Rating:</strong> {product.rating} ⭐
            </p>
            <hr />
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ListGroup className="mb-3">
              {product.features.map((feature, i) => (
                <ListGroup.Item key={i}>{feature}</ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              style={{
                backgroundColor: "#970747",
                color: "#fff",
                borderColor: "#970747",
              }}
              className="me-2"
            >
              Add to Cart
            </Button>
            <Button variant="outline-secondary">Add to Wishlist</Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h5>Product Description</h5>
            <p>{product.description}</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h5>Rating and Reviews</h5>
            <p>⭐⭐⭐⭐☆ - "Amazing quality and flavor!"</p>
            <p>⭐⭐⭐⭐⭐ - "Best spice I've used in a while!"</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h5>Similar Products</h5>
            <Row>
              {similarProducts.map((p) => (
                <Col key={p.id} md={4}>
                  <Card className="mb-3">
                    <Card.Img
                      variant="top"
                      src={p.image}
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        height: "auto",
                        margin: "0 auto",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{p.title}</Card.Title>
                      <Card.Text>${p.price}</Card.Text>
                      <Button
                        href={`/product/${p.id}`}
                        style={{
                          backgroundColor: "#970747",
                          color: "#fff",
                          borderColor: "#970747",
                        }}
                        variant="outline-primary"
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
