import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../assets/bannerImages/Black and Green Minimalist Premium Dates Ramadhan Special Offer Banner.png";
import banner2 from "../assets/bannerImages/Blue Pink Modern Simple Summer Sale Banner.png";
import banner3 from "../assets/bannerImages/White and Red Simple Valentine’s Day Super Sale Banner Landscape.png";

const BannerCarousel: React.FC = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={banner1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banner2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={banner3} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
