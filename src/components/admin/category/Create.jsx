import { Link } from "react-router-dom";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Create = () => {
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">
              <strong>Categories </strong>
              {">"} Create
            </h4>
            <Link to={"/admin/categories"} className="btn btn-primary">
              Back
            </Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter category name"
                      required
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <div className="position-relative">
                      <select className="form-control pe-4">
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Block</option>
                      </select>
                      <FontAwesomeIcon 
                        icon={faAngleDown} 
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                        style={{pointerEvents: 'none'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
                  <button className="btn btn-primary mt-3">Create</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
