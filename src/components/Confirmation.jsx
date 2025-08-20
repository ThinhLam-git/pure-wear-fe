import React, { useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { apiUrl, userToken } from "./common/http";
import { toast } from "react-toastify";
import Loader from "./common/Loader";

const Confirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPaymentStatus = (payment_status) => {
    if (payment_status == "not paid") {
      return "Cash on Delivery";
    } else if (payment_status == "paid") {
      return "Online Payment";
    } else {
      return "Pending";
    }
  };
  const fetchOrderDetail = async () => {
    setLoading(true);
    const res = await fetch(apiUrl + `/get-order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.status == 200) {
          setOrder(data.order);
          setOrderItems(data.order_items);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to fetch order");
      });
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  return (
    <Layout>
      <div className="container py-5">
        {loading === true && <Loader />}
        {loading === false && order && Object.keys(order).length > 0 && (
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 style={{ color: "green" }}>Thank you!</h1>
              <h3>You have successfully placed your order.</h3>
            </div>
            <div className="col-md-12 py-3">
              <div className="card shadow">
                <div className="card-body">
                  <h3 className="fw-bold">Order Details</h3>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Order ID:</strong> #{order ? order.id : "N/A"}
                      </p>
                      <p>
                        <strong>Order Date:</strong>{" "}
                        {order
                          ? new Date(order.created_at).toLocaleDateString()
                          : "Invalid Date"}
                      </p>
                      <p>
                        <strong>Order Status:</strong>{" "}
                        {order ? (
                          order.order_status == "pending" ? (
                            <span className="badge bg-warning">Pending</span>
                          ) : order.order_status == "shipped" ? (
                            <span className="badge bg-primary">Shipped</span>
                          ) : order.order_status == "delivered" ? (
                            <span className="badge bg-success">Delivered</span>
                          ) : order.order_status == "cancelled" ? (
                            <span className="badge bg-danger">Cancelled</span>
                          ) : (
                            <span className="">N/A</span>
                          )
                        ) : (
                          "N/A"
                        )}
                      </p>
                      <p>
                        <strong>Payment:</strong>{" "}
                        {order ? getPaymentStatus(order.payment_status) : "N/A"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Customer:</strong> {order ? order.name : "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {order
                          ? order.address +
                            ", " +
                            order.city +
                            ", " +
                            order.state +
                            ", " + order.zip : "N/A"}
                      </p>
                      <p>
                        <strong>Contact:</strong> {order ? order.mobile : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 py-3">
                      <h4 className="fw-bold">Order Items</h4>
                      <table className="table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <th width="60%">Item</th>
                            <th width="5%" className="text-center">
                              Size
                            </th>
                            <th width="10%" className="text-center">
                              Quantity
                            </th>
                            <th width="20%" className="text-center">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.map((item, index) => (
                            <tr key={`item-${index}`}>
                              <td>{item.name}</td>
                              <td className="text-center">{item.size}</td>
                              <td className="text-center">{item.qty}</td>
                              <td className="text-center">{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" className="text-end fw-bold">
                              SubTotal
                            </td>
                            <td className="text-center fw-bold">
                              {order ? order.subtotal : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end fw-bold">
                              Shipping Fee
                            </td>
                            <td className="text-center fw-bold">
                              {order ? order.shipping : "N/A"}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="text-end fw-bold">
                              Grand Total
                            </td>
                            <td className="text-center fw-bold">
                              {order ? order.grand_total : "N/A"}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="d-flex justify-content-center py-3">
                        <button className="btn btn-primary mx-2">
                          View Order Details
                        </button>
                        <Link to="/">
                          <button className="btn btn-outline-secondary mx-2">
                            Continue Shopping
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading === false && (!order || Object.keys(order).length === 0) && (
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 style={{ color: "red" }}>Order Not Found!</h1>
              <h3>Please try again later.</h3>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Confirmation;
