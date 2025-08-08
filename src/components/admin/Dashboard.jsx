import React, { useContext } from "react";
import Layout from "../common/Layout";
import { AdminAuthContext } from "../context/AdminAuth";

const Dashboard = () => {
  const { logout } = useContext(AdminAuthContext);

  return (
    <Layout>
      <h1>Dashboard Page</h1>
      <button className="btn btn-primary" onClick={logout}>
        Logout
      </button>
    </Layout>
  );
};

export default Dashboard;
