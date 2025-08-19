import React, { useContext } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/Auth";

const UserSidebar = () => {
    const { logout } = useContext(AuthContext);

  return (
    <div className="card shadow sidebar">
      <div className="card-body p-4">
        <ul>
          <li>
            <Link to="/account">Account</Link>
          </li>

          <li>
            <Link to={`/`}>Orders</Link>
          </li>
          <li>
            <Link to={`/`}>Change Password</Link>
          </li>

          <li>
            <a href="" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;