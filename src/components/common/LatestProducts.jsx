import React, { useEffect, useState } from "react";
import MenImg from "../../assets/images/Mens/Mens/eleven.jpg";
import { apiUrl, userToken } from "./http";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchLatestProducts = async () => {
    const res = await fetch(apiUrl + "/get-latest-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,

      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          setProducts(result.data);
        } else {
          console.error("Failed to fetch latest products.");
        }
      });
  };
  useEffect(() => {
    fetchLatestProducts();
  }, []);
  return (
    <section className="section-2 pt-5">
      <div className="container">
        <h2>New Arrival</h2>
        <div className="row mt-4">
          {products &&
            products.map((product, index) => {
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
                        <span className="text-decoration-line-through">
                          ${product.price}
                        </span>
                      </p>
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
