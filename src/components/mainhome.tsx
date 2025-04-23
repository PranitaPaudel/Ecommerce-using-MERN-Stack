import React from "react";
import BannerCarousel from "./BannerCarousel";
import ProductCards from "./ProductCards";
import { Container, Row, Col } from "react-bootstrap";

const MainHome: React.FC = () => {
  return (
    <Container className="py-5">
      {/* Banner Section */}
      <BannerCarousel />

      {/* Trending Products Section */}
      <Row className="mt-5">
        <Col>
          <h2
            style={{
              color: "#970747",
            }}
          >
            Trending Products
          </h2>
          <ProductCards />
        </Col>
      </Row>
    </Container>
  );
};

export default MainHome;
