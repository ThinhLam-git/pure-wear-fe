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
  const [brands, setBrands] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchBrands = async () => {
    setLoader(true);
    const res = await fetch(apiUrl + "/brands", {
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
          setBrands(result.data);
        } else {
          console.log("Failed to fetch brands.");
        }
      });
  };

  const deleteBrand = async (id) => {
    if (confirm(`Are you sure you want to delete this brand?`)) {
      const res = await fetch(apiUrl + `/brands/${id}`, {
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
            const newBrands = brands.filter((brand) => brand.id !== id);
            setBrands(newBrands);
            toast.success(result.message);
          } else {
            toast.error("Failed to delete brand.");
          }
        });
    }
  };

  useEffect(() => {
    // Auto fetch brands when component mounts
    fetchBrands();
  }, []);
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>Brands</strong>
            </h4>
            <Link to={"/admin/brands/create"} className="btn btn-primary">
              Create
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                {loader && <Loader />}
                {brands.length === 0 && !loader && (
                  <Nostate text="No brands found." />
                )}
                {brands && brands.length > 0 && (
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
                      {brands &&
                        brands.map((brand) => {
                          return (
                            <tr key={brand.id}>
                              <td>{brand.id}</td>
                              <td>{brand.name}</td>
                              <td>
                                {brand.status === 1 ? (
                                  <span className="badge bg-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge bg-danger">Block</span>
                                )}
                              </td>
                              <td>
                                <Link
                                  to={`/admin/brands/edit/${brand.id}`}
                                  className="text-primary"
                                >
                                  <FontAwesomeIcon icon={faEdit} size="lg" />
                                </Link>
                                <Link
                                  onClick={() => deleteBrand(brand.id)}
                                  className="text-danger ms-2"
                                >
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
