import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../common/Loader";
import { adminToken, apiUrl } from "../../common/http";
import { toast } from "react-toastify";
import Nostate from "../../common/Nostate";

const Show = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchProducts = async () => {
    setLoader(true);
    const res = await fetch(apiUrl + "/products", {
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
          setProducts(result.data);
        } else {
          console.log("Failed to fetch products.");
        }
      });
  };

  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(apiUrl + `/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === 200) {
            const newProducts = products.filter((product) => product.id !== id);
            setProducts(newProducts);
            toast.success(result.message);
          } else {
            toast.error("Failed to delete product.");
          }
        });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>Products</strong>
            </h4>
            <Link to={"/admin/products/create"} className="btn btn-primary">
              Create
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loader == true && <Loader />}
                {loader == false && products.length == 0 && (
                  <Nostate text="Products not found" />
                )}
                {products && products.length > 0 && (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <td width={50}>ID</td>
                        <td width={100}>Image</td>
                        <td >Title</td>
                        <td width={100}>Price</td>
                        <td width={100}>Quantity</td>
                        <td width={100}>SKU</td>
                        <td width={100}>Status</td>
                        <td width={120}>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td><img style={{width:"70px"}} src={product.image_url || ""} alt="Product Image" /></td>
                              <td>${product.title}</td>
                              <td>{product.price}</td>
                              <td>{product.qty}</td>
                              <td>{product.sku}</td>
                              <td>
                                {product.status === 1 ? (
                                  <span className="badge bg-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">Block</span>
                                )}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/products/edit/${product.id}`}
                                  className="text-primary"
                                >
                                  <FontAwesomeIcon icon={faEdit} size="lg" />
                                </Link>
                                <button
                                  onClick={() => deleteProduct(product.id)}
                                  className="btn btn-link text-danger ms-2 p-0"
                                  style={{ border: "none", background: "none" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    size="lg"
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Show;
