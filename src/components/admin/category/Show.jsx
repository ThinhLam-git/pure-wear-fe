import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { apiUrl, adminToken } from "../../common/http";
import Loader from "../../common/Loader";
import Nostate from "../../common/Nostate";
import { toast } from "react-toastify";

const Show = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchCategories = async () => {
    setLoader(true);
    const res = await fetch(apiUrl + "/categories", {
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
          setCategories(result.data);
        } else {
          console.log("Failed to fetch categories.");
        }
      });
  };

  const deleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const res = await fetch(apiUrl + `/categories/${id}`, {
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
            const newCategories = categories.filter(
              (category) => category.id !== id
            );
            setCategories(newCategories);
            toast.success(result.message);
          } else {
            toast.error("Failed to delete category.");
          }
        });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>Categories</strong>
            </h4>
            <Link to={"/admin/categories/create"} className="btn btn-primary">
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
                {loader == false && categories.length == 0 && (
                  <Nostate text="Category not found" />
                )}
                {categories && categories.length > 0 && (
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <td width={50}>ID</td>
                        <td>Name</td>
                        <td width={100}>Status</td>
                        <td width={100}>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {categories &&
                        categories.map((category) => {
                          return (
                            <tr>
                              <td>{category.id}</td>
                              <td>{category.name}</td>
                              <td>
                                {category.status === 1 ? (
                                  <span className="badge bg-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">Block</span>
                                )}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/categories/edit/${category.id}`}
                                  className="text-primary"
                                >
                                  <FontAwesomeIcon icon={faEdit} size="lg" />
                                </Link>
                                <Link className="text-danger ms-2" onClick={() => deleteCategory(category.id)}>
                                  <FontAwesomeIcon
                                    icon={faTrashCan}
                                    size="lg"
                                  />
                                </Link>
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
