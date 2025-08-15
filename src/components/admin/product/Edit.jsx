import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { set, useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import JoditEditor from "jodit-react";

const Edit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sizesSelected, setSizesSelected] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();
  const params = useParams();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Write product description here...",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      setLoader(true);

      const res = await fetch(apiUrl + `/products/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setLoader(false);
          if (result.status === 200) {
            setProduct(result.data);
            setSizesSelected(result.productSizes);
            setContent(result.data.description);
            setProductImages(result.data.product_images);
            reset({
              title: result.data.title,
              category: result.data.category,
              brand: result.data.brand,
              short_description: result.data.short_description,
              price: result.data.price,
              compare_price: result.data.compare_price,
              sku: result.data.sku,
              barcode: result.data.barcode,
              qty: result.data.qty,
              status: result.data.status.toString(),
              is_featured: result.data.is_featured.toString(),
            });
          } else {
            toast.error("Failed to fetch product details.");
          }
        });
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
          setSizes(result.data);
        } else {
          console.log("Failed to fetch sizes.");
        }
      });
  };

  const saveProduct = async (data) => {
    // Include existing image data to prevent it from being set to null
    const formdata = {
      ...data,
      description: content,
      image: productImages, // Include the existing image
    };

    setDisable(true);

    try {
      const res = await fetch(apiUrl + `/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(formdata),
      });

      const result = await res.json();
      setDisable(false);

      if (result.status === 200) {
        toast.success(result.message);
        nav("/admin/products");
      } else {
        const formErrors = result.errors || {};
        // toast.error(result.message || "Failed to create product.");
        Object.keys(formErrors).forEach((field) => {
          setError(field, { message: formErrors[field][0] });
        });
      }
    } catch (error) {
      setDisable(false);
      console.error("Error creating product:", error);
      toast.error("Failed to create product.");
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const files = e.target.files[0];
    formData.append("image", files);
    formData.append("product_id", params.id);
    setDisable(true);

    const res = await fetch(apiUrl + "/save-product-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);

        if (result.status === 200) {
          productImages.push(result.data);
          setProductImages(productImages);
        } else {
          toast.error(result.errors.image[0]);
        }
        e.target.value = "";
      });
  };

  const changeDefaultImage = async (image) => {
    const res = await fetch(
      apiUrl +
        `/change-product-default-image?product_id=${params.id}&image=${image}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error("Failed to change default image.");
        }
      });
  };

  const deleteProductImage = async (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setDisable(true);
      const res = await fetch(apiUrl + `/delete-product-image/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setDisable(false);

          if (result.status === 200) {
            setProductImages(productImages.filter((img) => img.id !== id));
            toast.success(result.message);
          } else {
            toast.error("Failed to delete product image.");
          }
        });
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchSizes();
  }, []);

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
                    <div
                      className="d-flex justify-content-center align-items-center position-absolute w-100 h-100"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.8)",
                        zIndex: 10,
                        top: 0,
                        left: 0,
                      }}
                    >
                      <Loader />
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Title
                    </label>
                    <input
                      {...register("title", {
                        required: "The title field is required.",
                      })}
                      type="text"
                      className={`form-control ${errors.title && "is-invalid"}`}
                      placeholder="Enter product title"
                      disabled={loader}
                    />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title?.message}
                      </p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Category
                        </label>
                        <select
                          {...register("category", {
                            required: "Please select a category.",
                          })}
                          className={`form-control pe-4 ${
                            errors.category && "is-invalid"
                          }`}
                          disabled={loader}
                        >
                          <option value="">Select Category</option>
                          {categories &&
                            categories.map((category) => (
                              <option
                                key={`category-${category.id}`}
                                value={category.id}
                              >
                                {category.name}
                              </option>
                            ))}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category?.message}
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
                            {...register("brand")}
                            className={`form-control pe-4 `}
                            disabled={loader}
                          >
                            <option value="">Select Brand</option>
                            {brands.map((brand) => (
                              <option
                                key={`brand-${brand.id}`}
                                value={brand.id}
                              >
                                {brand.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      {...register("short_description")}
                      className="form-control"
                      placeholder="Short Description"
                      rows={3}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>

                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </div>

                  <h3 className="py-3 border-bottom mb-3 ">Pricing</h3>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          {...register("price", {
                            required: "Price is required",
                            pattern: {
                              value: /^\d+(\.\d+)?$/,
                              message: "Please enter a valid price",
                            },
                          })}
                          type="text"
                          placeholder="Price"
                          className={`form-control ${
                            errors.price ? "is-invalid" : ""
                          }`}
                        ></input>
                        {errors.price && (
                          <div className="invalid-feedback">
                            {errors.price.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                          {...register("compare_price", {
                            pattern: {
                              value: /^\d+(\.\d+)?$/,
                              message: "Please enter a valid price",
                            },
                          })}
                          type="text"
                          placeholder="Discounted Price"
                          className={`form-control ${
                            errors.discounted_price ? "is-invalid" : ""
                          }`}
                        ></input>
                        {errors.discounted_price && (
                          <div className="invalid-feedback">
                            {errors.discounted_price.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="py-3 border-bottom mb-3 ">Inventory</h3>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          {...register("sku", {
                            required: "SKU is required",
                          })}
                          type="text"
                          placeholder="SKU"
                          className={`form-control ${
                            errors.sku ? "is-invalid" : ""
                          }`}
                        ></input>
                        {errors.sku && (
                          <div className="invalid-feedback">
                            {errors.sku.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Barcode
                        </label>
                        <input
                          {...register("barcode")}
                          type="text"
                          placeholder="Barcode"
                          className="form-control"
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Quantity
                        </label>
                        <input
                          {...register("qty", {
                            required: "Quantity is required",
                            pattern: {
                              value: /^\d+$/,
                              message: "Please enter a valid quantity",
                            },
                          })}
                          className={`form-control ${
                            errors.qty ? "is-invalid" : ""
                          }`}
                          type="text"
                          placeholder="Quantity"
                        ></input>
                        {errors.qty && (
                          <div className="invalid-feedback">
                            {errors.qty.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
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
                          {errors.status && (
                            <div className="invalid-feedback">
                              {errors.status?.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Featured Product
                        </label>
                        <select
                          {...register("is_featured", {
                            required:
                              "Please select if this is a featured product.",
                          })}
                          className={`form-control ${
                            errors.is_featured ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select Option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.is_featured && (
                          <div className="invalid-feedback">
                            {errors.is_featured.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Size</label>
                    {sizes &&
                      sizes.map((size) => (
                        <div
                          className="form-check-inline ps-3"
                          key={`psize-${size.id}`}
                        >
                          <input
                            {...register("sizes")}
                            className="form-check-input"
                            checked={sizesSelected.includes(size.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSizesSelected([...sizesSelected, size.id]);
                              } else {
                                setSizesSelected(
                                  sizesSelected.filter((id) => id !== size.id)
                                );
                              }
                            }}
                            type="checkbox"
                            value={size.id}
                            id={`size-${size.id}`}
                          />
                          <label
                            className="form-check-label ps-2"
                            htmlFor={`size-${size.id}`}
                          >
                            {size.name}
                          </label>
                        </div>
                      ))}
                  </div>

                  <h3 className="py-3 border-bottom mb-3 ">Gallery</h3>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      onChange={handleFile}
                      type="file"
                      className="form-control"
                    />
                  </div>

                  <div className="row">
                    {productImages &&
                      productImages.map((productImage, index) => {
                        return (
                          <div
                            className="col-md-3 mb-3"
                            key={`productImage-${index}`}
                          >
                            <img
                              src={productImage.image_url}
                              alt=""
                              className="img-fluid rounded w-100"
                            />
                            <button
                              type="button"
                              className="btn btn-danger mt-2 text-center justify-content-center align-items-center"
                              onClick={() => {
                                deleteProductImage(productImage.id);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary mt-2 ms-2"
                              onClick={() => {
                                changeDefaultImage(productImage.image);
                              }}
                            >
                              Set as Default
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <button
                disabled={disable || loader}
                type="submit"
                className="btn btn-primary mt-3"
              >
                {disable ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
