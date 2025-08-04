import React from "react";
import MenImg from "../../assets/images/Mens/Mens/eleven.jpg";

const LatestProducts = () => {
  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrival</h2>
        <div className="row mt-4">
          <div className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <img src={MenImg} alt="Eleventh Shirt" className="w-100" />
              </div>
              <div className="card-body py-3">
                <a href="" className="card-title">
                  Eleventh Shirt
                </a>
                <p className="card-price">
                  $29.99{" "}
                  <span className="text-decoration-line-through">$39.99</span>
                </p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <img src={MenImg} alt="Eleventh Shirt" className="w-100" />
              </div>
              <div className="card-body py-3">
                <a href="" className="card-title">
                  Eleventh Shirt
                </a>
                <p className="card-price">
                  $29.99{" "}
                  <span className="text-decoration-line-through">$39.99</span>
                </p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <img src={MenImg} alt="Eleventh Shirt" className="w-100" />
              </div>
              <div className="card-body py-3">
                <a href="" className="card-title">
                  Eleventh Shirt
                </a>
                <p className="card-price">
                  $29.99{" "}
                  <span className="text-decoration-line-through">$39.99</span>
                </p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="product card border-0">
              <div className="card-img">
                <img src={MenImg} alt="Eleventh Shirt" className="w-100" />
              </div>
              <div className="card-body py-3">
                <a href="" className="card-title">
                  Eleventh Shirt
                </a>
                <p className="card-price">
                  $29.99{" "}
                  <span className="text-decoration-line-through">$39.99</span>
                </p>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
