import React, { useContext, useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "./context/Cart";

const Cart = () => {
  const {
    cartData,
    shipping,
    subTotal,
    grandTotal,
    updateCartItemQty,
    deleteCartItem,
  } = useContext(CartContext);
  const [qty, setQty] = useState({});

  const handleQtyChange = (e, id) => {
    const newQty = e.target.value;
    setQty((prev) => ({
      ...prev,
      [id]: newQty,
    }));
    updateCartItemQty(id, newQty);
  };

  const handleDeleteCartItem = (id) => {
    deleteCartItem(id);
  };

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
                {cartData.length == 0 ? (
                  <tr>
                    <td colSpan={5} height={200} valign="middle" align="center">
                      <h4>Your cart is empty</h4>
                    </td>
                  </tr>
                ) : (
                  cartData.map((item, index) => {
                    return (
                      <tr key={`cart-item-${index}`}>
                        <td width={100}>
                          <img src={item.image_url} alt="Product" width={80} />
                        </td>
                        <td width={600}>
                          <h4 className="">{item.title}</h4>
                          <div className="d-flex align-items-center">
                            <span className="">${item.price}</span>
                            <div className="ps-3">
                              <button className="btn btn-size">
                                {item.size ? item.size : "Select Size"}
                              </button>
                            </div>
                          </div>
                        </td>
                        <td valign="middle">
                          <input
                            style={{ width: "100px" }}
                            type="number"
                            className="form-control"
                            value={qty[item.id] || item.qty}
                            min={1}
                            max={10}
                            onChange={(e) => handleQtyChange(e, item.id)}
                          />
                        </td>
                        <td valign="middle">
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faTrashCan}
                            size="lg"
                            onClick={() => handleDeleteCartItem(item.id)}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row justify-content-end pb-5">
          <div className="col-md-3">
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

            <div className="d-flex justify-content-between pt-3 ">
              <button className="btn btn-primary w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
