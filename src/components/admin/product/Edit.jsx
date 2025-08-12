import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Layout from "../../common/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Edit = () => {
  const [disable, setDisable] = useState(false);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();
  const params = useParams();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      setLoader(true);

      // Fetch categories and brands
      await Promise.all([fetchCategories(), fetchBrands()]);

      // Fetch product data
      try {
        const res = await fetch(apiUrl + `/products/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });
        
        const result = await res.json();
        setLoader(false);
        
        if (result.status === 200) {
          setProduct(result.data);
          reset({
            name: result.data.name,
            description: result.data.description,
            price: result.data.price,
            compare_price: result.data.compare_price,
            category_id: result.data.category_id,
            brand_id: result.data.brand_id,
            sku: result.data.sku,
            qty: result.data.qty,
            status: result.data.status,
          });
        } else {
          toast.error("Failed to fetch product.");
        }
      } catch (error) {
        setLoader(false);
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product.");
      }
    },
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch(apiUrl + "/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      
      const result = await res.json();
      if (result.status === 200) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(apiUrl + "/brands", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });
      
      const result = await res.json();
      if (result.status === 200) {
        setBrands(result.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const saveProduct = async (data) => {
    setDisable(true);

    try {
      const res = await fetch(apiUrl + `/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      setDisable(false);
      
      if (result.status === 200) {
        toast.success(result.message);
        nav("/admin/products");
      } else {
        toast.error(result.message || "Failed to update product.");
      }
    } catch (error) {
      setDisable(false);
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>Products </strong>
              {">"} Edit
            </h4>
            <Link to={"/admin/products"} className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow position-relative">
                <div className="card-body p-4">
                  {loader && (
                    <div className="d-flex justify-content-center align-items-center position-absolute w-100 h-100" 
                         style={{backgroundColor: 'rgba(255,255,255,0.8)', zIndex: 10, top: 0, left: 0}}>
                      <Loader />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      {...register("name", {
                        required: "The name field is required.",
                      })}
                      type="text"
                      className={`form-control ${errors.name && "is-invalid"}`}
                      placeholder="Enter product name"
                      disabled={loader}
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name?.message}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      className="form-control"
                      placeholder="Enter product description"
                      rows="3"
                      disabled={loader}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          {...register("price", {
                            required: "The price field is required.",
                            min: { value: 0, message: "Price must be greater than 0" }
                          })}
                          type="number"
                          step="0.01"
                          className={`form-control ${errors.price && "is-invalid"}`}
                          placeholder="Enter price"
                          disabled={loader}
                        />
                        {errors.price && (
                          <p className="invalid-feedback">{errors.price?.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Compare Price
                        </label>
                        <input
                          {...register("compare_price")}
                          type="number"
                          step="0.01"
                          className="form-control"
                          placeholder="Enter compare price"
                          disabled={loader}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Category
                        </label>
                        <div className="position-relative">
                          <select
                            {...register("category_id", {
                              required: "Please select a category.",
                            })}
                            className={`form-control pe-4 ${
                              errors.category_id && "is-invalid"
                            }`}
                            disabled={loader}
                          >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          <FontAwesomeIcon 
                            icon={faArrowDown} 
                            className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                            style={{pointerEvents: 'none'}}
                          />
                        </div>
                        {errors.category_id && (
                          <p className="invalid-feedback">
                            {errors.category_id?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Brand
                        </label>
                        <div className="position-relative">
                          <select
                            {...register("brand_id", {
                              required: "Please select a brand.",
                            })}
                            className={`form-control pe-4 ${
                              errors.brand_id && "is-invalid"
                            }`}
                            disabled={loader}
                          >
                            <option value="">Select Brand</option>
                            {brands.map((brand) => (
                              <option key={brand.id} value={brand.id}>
                                {brand.name}
                              </option>
                            ))}
                          </select>
                          <FontAwesomeIcon 
                            icon={faArrowDown} 
                            className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                            style={{pointerEvents: 'none'}}
                          />
                        </div>
                        {errors.brand_id && (
                          <p className="invalid-feedback">
                            {errors.brand_id?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          {...register("sku")}
                          type="text"
                          className="form-control"
                          placeholder="Enter SKU"
                          disabled={loader}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Quantity
                        </label>
                        <input
                          {...register("qty")}
                          type="number"
                          className="form-control"
                          placeholder="Enter quantity"
                          disabled={loader}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <div className="position-relative">
                      <select
                        {...register("status", {
                          required: "Please select a status.",
                        })}
                        className={`form-control pe-4 ${
                          errors.status && "is-invalid"
                        }`}
                        disabled={loader}
                      >
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                      <FontAwesomeIcon 
                        icon={faArrowDown} 
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                        style={{pointerEvents: 'none'}}
                      />
                    </div>
                    {errors.status && (
                      <p className="invalid-feedback">
                        {errors.status?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable || loader}
                type="submit"
                className="btn btn-primary mt-3"
              >
                {disable ? 'Updating...' : 'Update'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
