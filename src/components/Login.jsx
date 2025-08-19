import React, { useContext } from "react";
import Layout from "./common/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl } from "./common/http";
import { toast } from "react-toastify";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login, userToken } = useContext(AuthContext);


  const onSubmit = async (data) => {
    const res = await fetch(apiUrl + `/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(result.message);
          const userInfo = {
            name: result.name,
            id: result.id,
            token: result.token,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          login(userInfo);  
          navigate("/account");
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
                <strong>Login</strong>
              </h3>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "The email field is required.",
                  })}
                  type="text"
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
                <button className="btn btn-secondary w-100">Login</button>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <p>
                  Don't have an account?{" "}
                  <Link to="/account/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
