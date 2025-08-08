import React from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/Mens/Mens/six.jpg";
import ProductImg2 from "../assets/images/Mens/Mens/seven.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              aria-label="breadcrumb"
              className="py-4"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Cart
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-12">
            <h2 className="border-bottom py-3">Cart</h2>

            <table className="table">
              <tbody>
                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="Product" width={80} />
                  </td>
                  <td width={600}>
                    <h4 className="">Dummy Product Title</h4>
                    <div className="d-flex align-items-center">
                      <span className="">$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">M</button>
                      </div>
                    </div>
                  </td>
                  <td valign="middle">
                    <input
                      style={{ width: "100px" }}
                      type="number"
                      className="form-control"
                      value={1}
                    />
                  </td>
                  <td valign="middle">
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </td>
                </tr>

                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="Product" width={80} />
                  </td>
                  <td width={600}>
                    <h4 className="">Dummy Product Title</h4>
                    <div className="d-flex align-items-center">
                      <span className="">$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">M</button>
                      </div>
                    </div>
                  </td>
                  <td valign="middle">
                    <input
                      style={{ width: "100px" }}
                      type="number"
                      className="form-control"
                      value={1}
                    />
                  </td>
                  <td valign="middle">
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </td>
                </tr>

                <tr>
                  <td width={100}>
                    <img src={ProductImg} alt="Product" width={80} />
                  </td>
                  <td width={600}>
                    <h4 className="">Dummy Product Title</h4>
                    <div className="d-flex align-items-center">
                      <span className="">$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">M</button>
                      </div>
                    </div>
                  </td>
                  <td valign="middle">
                    <input
                      style={{ width: "100px" }}
                      type="number"
                      className="form-control"
                      value={1}
                    />
                  </td>
                  <td valign="middle">
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row justify-content-end pb-5">
            <div className="col-md-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div className="">Subtotal</div>
                    <div className="">$30</div>
                </div>
                
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div className="">Shipping</div>
                    <div className="">$5</div>
                </div>
                
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div className=""><strong>Grand Total</strong></div>
                    <div className="">$35</div>
                </div>

                <div className="d-flex justify-content-between pt-3 ">
                    <button className="btn btn-primary w-100">Proceed to Checkout</button>
                </div>

                
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
