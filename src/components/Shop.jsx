import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import MenImg from "../assets/images/Mens/Mens/two.jpg";
import { Link, useSearchParams } from "react-router-dom";
import { adminToken, apiUrl } from "./common/http";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const category = searchParams.get("category_id");
    return category ? category.split(",") : [];
  });
  const [selectedBrands, setSelectedBrands] = useState(() => {
    const brand = searchParams.get("brand_id");
    return brand ? brand.split(",") : [];
  });

  const fetchCategories = async () => {
    const res = await fetch(apiUrl + "/get-categories", {
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
          setCategories(result.data);
        } else {
          console.error("Failed to fetch categories.");
        }
      });
  };

  const fetchBrands = async () => {
    const res = await fetch(apiUrl + "/get-brands", {
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
          setBrands(result.data);
        } else {
          console.error("Failed to fetch brands.");
        }
      });
  };

  const fetchProducts = async () => {
    let search = [];
    let params = "";

    if (selectedBrands.length > 0) {
      search.push(["brand_id", selectedBrands]);
    }

    if (selectedCategories.length > 0) {
      search.push(["category_id", selectedCategories.join(",")]);
    }

    if (search.length > 0) {
      params = new URLSearchParams(search);
      setSearchParams(params);
    } else {
      setSearchParams("");
    }

    const res = await fetch(apiUrl + "/get-products?" + params, {
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
          console.error("Failed to fetch products.");
        }
      });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  };

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBrands((prev) => [...prev, value]);
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== value));
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, [selectedCategories, selectedBrands]);

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
                  {categories &&
                    categories.map((category, index) => {
                      return (
                        <li className="mb-2" key={`category-${index}`}>
                          <input
                            type="checkbox"
                            checked={
                              searchParams.get("category_id")
                                ? searchParams
                                    .get("category_id")
                                    .includes(category.id)
                                : false
                            }
                            value={category.id}
                            name={category.name}
                            onChange={handleCategoryChange}
                          />
                          <label htmlFor={category.id} className="ps-2">
                            {category.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="card shadow border-0 mb-3">
              <div className="card-body p-4">
                <h3 className="">Brands</h3>
                <ul>
                  {brands &&
                    brands.map((brand, index) => {
                      return (
                        <li className="mb-2" key={`brand-${index}`}>
                          <input
                            type="checkbox"
                            checked={
                              searchParams.get("brand_id")
                                ? searchParams
                                    .get("brand_id")
                                    .includes(brand.id)
                                : false
                            }
                            value={brand.id}
                            name={brand.name}
                            onChange={handleBrandChange}
                          />
                          <label htmlFor={brand.name} className="ps-2">
                            {brand.name}
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products &&
                products.map((product, index) => {
                  return (
                    <div className="col-md-4 col-6" key={`product-${index}`}>
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to={`/product/${product.id}`}>
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="w-100"
                            />
                          </Link>
                        </div>
                        <div className="card-body py-3">
                          <Link
                            to={`/product/${product.id}`}
                            className="card-title"
                          >
                            {product.title}
                          </Link>
                          <p className="card-price">
                            ${product.compare_price}{" "}
                            <span className="text-decoration-line-through">
                              ${product.price}
                            </span>
                          </p>
                          <button className="btn btn-primary">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
