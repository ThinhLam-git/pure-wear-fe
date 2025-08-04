import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SliderFirstImg from "../../assets/images/banner-1.jpg"; // Example image, replace with actual path
import SliderSecondImg from "../../assets/images/banner-2.jpg"; // Example image, replace with actual path

const Slider = () => {
  return (
    <section className="section-1">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderFirstImg})` }}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="content"
            style={{ backgroundImage: `url(${SliderSecondImg})` }}
          ></div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Slider;
