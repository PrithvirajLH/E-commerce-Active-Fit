import React from 'react';
import {Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from './assets/bannerimages/slide1.png'
import slide2 from './assets/bannerimages/slide2.png'
import slide3 from './assets/bannerimages/slide3.png'
import slide4 from './assets/bannerimages/slide4.png'


const Banner=()=> {
  return (
    <Carousel>
      <Carousel.Item>
        <img 
          className="d-block w-100 "
          src={slide4}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide1}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Forth slide"
        />

      </Carousel.Item>
    </Carousel>
);
}

export default Banner;