import { useContext, useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Rating } from "react-simple-star-rating";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { adminToken, apiUrl } from "./common/http";
import { CartContext } from "./context/Cart";
import { toast } from "react-toastify";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [sizesLoaded, setSizesLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const params = useParams();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (productSizes.length > 0) {
      if (selectedSize == null) {
        toast.error("Please select a size");
      } else {
        addToCart(product, selectedSize);
        toast.success("Product added to cart");
      }
    } else {
      addToCart(product, null);
      toast.success("Product added to cart");
    }
  };

  const fetchProduct = async () => {
    const res = await fetch(apiUrl + `/get-product/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          console.log("Failed to fetch product.");
        }
      });
  };

  const fetchSizes = async () => {
    const res = await fetch(apiUrl + "/sizes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setAllSizes(result.data);
          setSizesLoaded(true);
        } else {
          console.log("Failed to fetch sizes.");
        }
      });
  };

  const getSizeName = (sizeId) => {
    if (!sizesLoaded || !allSizes.length) {
      return `Size ${sizeId}`; // Fallback while loading
    }
    const size = allSizes.find(s => s.id === sizeId);
    return size ? size.name : `Size ${sizeId}`;
  };

  // Check if we have images to display
  const hasImages = productImages && productImages.length > 0;

  useEffect(() => {
    fetchProduct();
    fetchSizes();
  }, []);

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
                  {product.title}
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5">
            <div className="row">
              {hasImages ? (
                <>
                  <div className="col-2">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#000",
                        "--swiper-pagination-color": "#000",
                        height: "400px",
                      }}
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      direction={"vertical"}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[Thumbs, FreeMode, Navigation]}
                      className="mySwiper mt-2"
                    >
                      {productImages.map((image, index) => {
                        return (
                          <SwiperSlide
                            key={`thumb-${index}`}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="content"
                              style={{ height: "80px", overflow: "hidden" }}
                            >
                              <img
                                src={image.image_url}
                                alt={`Product ${index + 1}`}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                  <div className="col-10">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#000",
                        "--swiper-pagination-color": "#000",
                        height: "400px",
                      }}
                      loop={true}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={
                        thumbsSwiper ? { swiper: thumbsSwiper } : undefined
                      }
                      modules={[Thumbs, Navigation, FreeMode]}
                      className="mySwiper2"
                    >
                      {productImages.map((image, index) => {
                        return (
                          <SwiperSlide key={`main-${index}`}>
                            <div
                              className="content"
                              style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={image.image_url}
                                alt={`Product ${index + 1}`}
                                className="w-100 h-100"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </>
              ) : (
                <div className="col-12">
                  <div
                    style={{
                      height: "400px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <p className="text-muted">No images available</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="d-flex">
              <Rating initialValue={rating} readonly size={20} />
              <span className="pt-1 ps-2">(100 reviews)</span>
            </div>

            <div className="price h2 py-3" style={{ fontWeight: "bold" }}>
              ${product.price}{" "}
              <span className="text-decoration-line-through">
                ${product.compare_price}
              </span>
            </div>

            <div className="">{product.short_description}</div>

            <div className="sizes pt-3">
              <h5 className="pt-2">Select Size</h5>
              {!sizesLoaded ? (
                <div className="d-flex">
                  {productSizes.map((size, index) => (
                    <button
                      key={`size-loading-${index}`}
                      className="btn btn-size ms-2"
                      disabled
                      style={{ opacity: 0.6 }}
                    >
                      Loading...
                    </button>
                  ))}
                </div>
              ) : (
                <div className="d-flex">
                  {productSizes.map((size, index) => {
                    const sizeName = getSizeName(size.size_id);
                    return (
                      <button
                        onClick={() => setSelectedSize(sizeName)}
                        style={{
                          backgroundColor:
                            selectedSize === sizeName
                              ? "#000"
                              : "#fff",
                          color:
                            selectedSize === sizeName
                              ? "#fff"
                              : "#000",
                        }}
                        className="btn btn-size ms-2"
                        key={`size-${index}`}
                      >
                        {sizeName}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="add-to-cart mt-3">
              <button
                className="btn btn-primary text-uppercase"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </button>
            </div>

            <hr />

            <div className="">
              <strong>SKU: </strong>
              {product.sku}
            </div>
          </div>
        </div>

        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="Description"
              id="product-detail-tabs"
              className="mb-3"
            >
              <Tab eventKey="Description" title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className=""
                ></div>
              </Tab>
              <Tab eventKey="Reviews" title="Reviews (100)">
                Reviews {product.reviews_count}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
