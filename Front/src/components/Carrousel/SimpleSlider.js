
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import styles from "./Carrousel.module.scss";
import { SampleNextArrow } from "./SampleNextArrow";
import { SamplePrevArrow } from "./SamplePrevArrow";


export const SimpleSlider = ({ nameOfCarrousel }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

  };

  return (
    <>
      <div className={`${styles.carrousel}`}>
        <Slider {...settings}>
          {nameOfCarrousel.map((image) =>
            <div className={`${styles.div}`}>
              <img src={image.image} className={`${styles.border}`} alt="" />
            </div>
          )}
        </Slider>
      </div>
    </>
  );

};