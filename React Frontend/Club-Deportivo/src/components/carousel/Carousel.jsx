import React from "react";
import { Carousel, Image } from "react-bootstrap";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";
import image4 from "../../images/image4.jpg";
import image5 from "../../images/image5.jpg";
import image6 from "../../images/image6.jpg";
import image7 from "../../images/image7.jpg";
import "./Carousel.css";

const CarouselImages = () => {
  return (
    <Carousel controls={false} indicators={true} className="carousel-container">
      <Carousel.Item interval={4000}>
        <Image
          src={image2}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <Image
          src={image1}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <Image
          src={image3}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <Image
          src={image4}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <Image
          src={image5}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <Image
          src={image6}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <Image
          src={image7}
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          fluid
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselImages;
