import React, { useState } from "react";
import Layout from "../../common/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/http";
import Loader from "../../common/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Edit = () => {
  const params = useParams();
  const [brand, setBrand] = useState({});
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
        setLoader(true);
      const res = await fetch(apiUrl + `/brands/${params.id}`, {
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
            setBrand(result.data);
            reset({
              name: result.data.name,
              status: result.data.status,
            });
          } else {
            toast.error("Failed to fetch brand details.");
          }
        });
    },
  });

  const saveBrand = async (data) => {
    setDisable(true);
    const res = await fetch(apiUrl + `/brands/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setDisable(false);
        if (result.status === 200) {
          toast.success(result.message);
          nav("/admin/brands");
        } else {
          toast.error("Failed to update brand.");
        }
      });
  };

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>Brands</strong>
              {">"} Edit
            </h4>
            <Link to={"/admin/brands"} className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveBrand)}>
              <div className="card shadow position-relative">
                <div className="card-body p-4">
                  {loader && (
                    <div
                      className="d-flex justify-content-center align-items-center position-absolute w-100 h-100"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name?.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      {...register("status", {
                        required: "Please select a status.",
                      })}
                      className={`form-control pe-4 ${
                        errors.status && "is-invalid"
                      }`}
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
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={disable || loader}
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
