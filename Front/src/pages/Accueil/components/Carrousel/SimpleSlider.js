
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import styles from "./Carrousel.module.scss";
import { SampleNextArrow } from "./SampleNextArrow";
import { SamplePrevArrow } from "./SamplePrevArrow";

/**
 * 
 * @param {object} param0 links images
 * @returns slider with settings with maps on Image
 */
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
      <section className={`${styles.carrousel}`}>
        <Slider {...settings}>
          {nameOfCarrousel.map((image, i) =>
            <div key={i} className={`${styles.div}`}>
              <img src={`http://localhost:8000/imgCarrousel/${image.photo}`} className={`${styles.border}`} alt="" />
            </div>
          )}
        </Slider>
      </section>
    </>
  );

};