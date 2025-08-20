import { useContext, useState } from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/Mens/Mens/six.jpg";
import { CartContext } from "./context/Cart";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "./common/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const { cartData, shipping, subTotal, grandTotal } = useContext(CartContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const processOrder = (data) => {
    if (paymentMethod == "cod") {
      saveOrder(data, "not paid");
    }
  };

  const saveOrder = async (formData, payment_status) => {
    const newFormData = {
      ...formData,
      payment_status: payment_status,
      grand_total: grandTotal(),
      subtotal: subTotal(),
      shipping: shipping(),
      discount: 0,
      order_status: "pending",
      cart: cartData,
    };

    fetch(apiUrl + `/save-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(newFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          localStorage.removeItem("cart");
          toast.success("Order saved successfully");
          navigate(`/order/confirmed/${data.id}`);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
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
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit(processOrder)}>
          <div className="row">
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong>Billing Details</strong>
              </h3>
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("name", {
                        required: "The field name is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("email", {
                        required: "The field email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="invalid-feedback">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    {...register("address", {
                      required: "The field address is required",
                    })}
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    placeholder="Address"
                    rows={3}
                  ></textarea>
                  {errors.address && (
                    <p className="invalid-feedback">{errors.address.message}</p>
                  )}
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("city", {
                        required: "The field city is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="invalid-feedback">{errors.city.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("state", {
                        required: "The field state is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.state ? "is-invalid" : ""
                      }`}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="invalid-feedback">{errors.state.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("zip", {
                        required: "The field zip is required",
                      })}
                      type="text"
                      className={`form-control ${
                        errors.zip ? "is-invalid" : ""
                      }`}
                      placeholder="Zip"
                    />
                    {errors.zip && (
                      <p className="invalid-feedback">{errors.zip.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      {...register("mobile", {
                        required: "The field mobile is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                      type="text"
                      className={`form-control ${
                        errors.mobile ? "is-invalid" : ""
                      }`}
                      placeholder="Mobile"
                    />
                    {errors.mobile && (
                      <p className="invalid-feedback">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong>Items</strong>
              </h3>
              <table className="pt-3 table">
                <tbody>
                  {cartData &&
                    cartData.map((item, index) => (
                      <tr key={`item-${index}`}>
                        <td width={100}>
                          <img src={item.image_url} alt="Product" width={80} />
                        </td>
                        <td>
                          <h4>{item.title}</h4>
                          <div className="d-flex align-items-center pt-3">
                            <span className="">${item.price}</span>
                            <div className="ps-3">
                              <button className="btn btn-size">
                                {item.size ? item.size : "Select Size"}
                              </button>
                            </div>
                            <div className="ps-5">x{item.qty}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div className="">Subtotal</div>
                    <div className="">${subTotal()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div className="">Shipping</div>
                    <div className="">${shipping()}</div>
                  </div>
                  <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div className="">
                      <strong>Grand Total</strong>
                    </div>
                    <div className="">${grandTotal()}</div>
                  </div>
                  <h3 className="border-bottom pt-4 pb-3">
                    <strong>Payment Method</strong>
                  </h3>
                  <div className="">
                    <div className="form-check">
                      <input
                        onClick={handlePaymentMethod}
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="creditCard">
                        Credit Card
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        onClick={handlePaymentMethod}
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="vnpay"
                      />
                      <label className="form-check-label" htmlFor="vnpay">
                        VNPay
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        onClick={handlePaymentMethod}
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        COD
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start pt-3">
                    <button className="btn btn-primary text-uppercase">
                      <strong>Pay Now</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
