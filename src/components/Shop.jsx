import React from "react";
import Layout from "./common/Layout";
import MenImg from "../assets/images/Mens/Mens/two.jpg";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <Layout>
      <div className="container">
        <nav
          style={{ "--bs-breadcrumb-divider": "'>'" }}
          aria-label="breadcrumb"
          className="py-4"
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>

        <div className="row pb-5">
          <div className="col-md-3">
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="">Categories</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Men
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Women
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Kids
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="">Brands</h3>
                <ul>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Nike
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Adidas
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Louis Vuitton
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Dior
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Givenchy
                    </label>
                  </li>
                  <li className="mb-2">
                    <input type="checkbox" />
                    <label htmlFor="" className="ps-2">
                      Gucci
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to="/product">
                      <img src={MenImg} alt="Eighth Shirt" className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body py-3">
                    <Link to="/product" className="card-title">
                      Eighth Shirt
                    </Link>
                    <p className="card-price">
                      $39.99{" "}
                      <span className="text-decoration-line-through">
                        $59.99
                      </span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={MenImg} alt="Eighth Shirt" className="w-100" />
                  </div>
                  <div className="card-body py-3">
                    <a href="" className="card-title">
                      Eighth Shirt
                    </a>
                    <p className="card-price">
                      $39.99{" "}
                      <span className="text-decoration-line-through">
                        $59.99
                      </span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={MenImg} alt="Eighth Shirt" className="w-100" />
                  </div>
                  <div className="card-body py-3">
                    <a href="" className="card-title">
                      Eighth Shirt
                    </a>
                    <p className="card-price">
                      $39.99{" "}
                      <span className="text-decoration-line-through">
                        $59.99
                      </span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={MenImg} alt="Eighth Shirt" className="w-100" />
                  </div>
                  <div className="card-body py-3">
                    <a href="" className="card-title">
                      Eighth Shirt
                    </a>
                    <p className="card-price">
                      $39.99{" "}
                      <span className="text-decoration-line-through">
                        $59.99
                      </span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={MenImg} alt="Eighth Shirt" className="w-100" />
                  </div>
                  <div className="card-body py-3">
                    <a href="" className="card-title">
                      Eighth Shirt
                    </a>
                    <p className="card-price">
                      $39.99{" "}
                      <span className="text-decoration-line-through">
                        $59.99
                      </span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="product card border-0">
                  <div className="card-img">
                    <img src={MenImg} alt="Eighth Shirt" className="w-100" />
                  </div>
                  <div className="card-body py-3">
                    <a href="" className="card-title">
                      Eighth Shirt
                    </a>
                    <p className="card-price">
                      $39.99{" "}
                      <span className="text-decoration-line-through">
                        $59.99
                      </span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
