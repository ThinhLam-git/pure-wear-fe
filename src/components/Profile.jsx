import React, { useContext } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import { AuthContext } from "./context/Auth";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>My Account</strong>
            </h4>
          </div>
          <div className="col-md-3">
            <UserSidebar />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
