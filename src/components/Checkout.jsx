import { useState } from "react";
import Layout from "./common/Layout";
import ProductImg from "../assets/images/Mens/Mens/six.jpg";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.id);
  }
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

        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">
              <strong>Billing Details</strong>
            </h3>
            <form action="">
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    rows={3}
                  ></textarea>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-5">
            <h3 className="border-bottom pb-3">
              <strong>Items</strong>
            </h3>
            <table className="pt-3 table">
              <tbody>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="Product" width={80} />
                  </td>
                  <td>
                    <h4>Dummy Product Title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span className="">$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">M</button>
                      </div>
                      <div className="ps-5">x1</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="Product" width={80} />
                  </td>
                  <td>
                    <h4>Dummy Product Title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span className="">$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">M</button>
                      </div>
                      <div className="ps-5">x1</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="Product" width={80} />
                  </td>
                  <td>
                    <h4>Dummy Product Title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span className="">$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">M</button>
                      </div>
                      <div className="ps-5">x1</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                  <div className="">Subtotal</div>
                  <div className="">$30</div>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                  <div className="">Shipping</div>
                  <div className="">$5</div>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                  <div className="">
                    <strong>Grand Total</strong>
                  </div>
                  <div className="">$35</div>
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
                      value="cod"
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      COD
                    </label>
                  </div>
                </div>
                <div className="d-flex justify-content-start pt-3">
                  <button className="btn btn-primary text-uppercase">
                    <strong>Place Order</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
