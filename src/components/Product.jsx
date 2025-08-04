import { React, useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ProductImg from "../assets/images/Mens/Mens/six.jpg";
import ProductImg2 from "../assets/images/Mens/Mens/three.jpg";
import ProductImg3 from "../assets/images/Mens/Mens/four.jpg";
import { Rating } from "react-simple-star-rating";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              aria-label="breadcrumb"
              className="py-4"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dummy Product Title
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={"vertical"}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[Thumbs, FreeMode, Navigation]}
                  className="mySwiper mt-2"
                >
                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImg}
                        alt="Product"
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImg2}
                        alt="Product"
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img
                        src={ProductImg3}
                        alt="Product"
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[Thumbs, Navigation, FreeMode]}
                  className="mySwiper2"
                >
                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImg} alt="Product" className="w-100" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImg2} alt="Product" className="w-100" />
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="content">
                      <img src={ProductImg3} alt="Product" className="w-100" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <h2>Dummy Product Title</h2>
            <div className="d-flex">
              <Rating initialValue={rating} readonly size={20} />
              <span className="pt-1 ps-2">(100 reviews)</span>
            </div>

            <div className="price h2 py-3" style={{ fontWeight: "bold" }}>
              $20 <span className="text-decoration-line-through">$30</span>
            </div>

            <div className="">
              100% Original Products <br />
              Pay on Delivery Available <br />
              Easy 30 days returns and exchanges <br />
            </div>

            <div className="sizes pt-3">
              <h5 className="pt-2">Select Size</h5>
              <button className="btn btn-size">S</button>
              <button className="btn btn-size ms-2">M</button>
              <button className="btn btn-size ms-2">L</button>
              <button className="btn btn-size ms-2">XL</button>
            </div>

            <div className="add-to-cart mt-3">
              <button className="btn btn-primary text-uppercase">Add to Cart</button>
            </div>

            <hr />

            <div className="">
              <strong>SKU: </strong>DDXX2234
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="profile"
              id="product-detail-tabs"
              className="mb-3"
            >
              <Tab eventKey="Home" title="Description">
                  Tab content for description
              </Tab>
              <Tab eventKey="profile" title="Reviews (100)">
                  Reviews Area
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
