import React, { useEffect, useState } from 'react'
import MenImg from "../../assets/images/Mens/Mens/eight.jpg";
import { adminToken, apiUrl } from './http';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchFeaturedProducts = async () => {
    const res = await fetch(apiUrl + "/get-featured-products", {
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
          setProducts(result.data);
        } else {
          console.error("Failed to fetch featured products.");
        }
      });
  };
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <section className="section-2 py-5">
          <div className="container">
            <h2>Featured Products</h2>
            <div className="row mt-4">
              {
                products && products.map((product, index) => {
                  return (
                    
                  <div className="col-md-3 col-6" key={`product-${index}`}>
                <div className="product card border-0">
                  <div className="card-img">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image_url} alt={product.title} className="w-100" />
                    </Link>
                  </div>
                  <div className="card-body py-3">
                    <Link to={`/product/${product.id}`} className="card-title">
                      {product.title}
                    </Link>
                    <p className="card-price">
                      ${product.compare_price}{" "}
                      <span className="text-decoration-line-through">${product.price}</span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
                  )
                })
              }
              {/* <div className="col-md-3 col-6">
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
                      <span className="text-decoration-line-through">$59.99</span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
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
                      <span className="text-decoration-line-through">$59.99</span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
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
                      <span className="text-decoration-line-through">$59.99</span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
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
                      <span className="text-decoration-line-through">$59.99</span>
                    </p>
                    <button className="btn btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div> */}
              
            </div>
          </div>
        </section>
  )
}

export default FeaturedProducts