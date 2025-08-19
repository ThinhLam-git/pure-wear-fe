import React from "react";
import Layout from "./common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl } from "./common/http";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(apiUrl + `/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message);
          navigate("/account/login");
        } else {
          const formErrors = result.errors || {};
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-3">
              <h3 className="text-center">
                <strong>Register</strong>
              </h3>
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
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="invalid-feedback">{errors.name?.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The email field is required.",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="invalid-feedback">{errors.email?.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "The password field is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long.",
                    },
                  })}
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="invalid-feedback">{errors.password?.message}</p>
                )}
              </div>
              <div className="d-flex justify-content-center pt-3">
                <button className="btn btn-secondary w-100">Register</button>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/account/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
