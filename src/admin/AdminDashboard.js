import React, { Fragment } from "react";
import Layout from "../core/partials/Layout";
import isAuth from "../auth/AuthService";
import sidebar from "./layouts/sidebar";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuth();

  const adminInfo = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Information De L'utilisateur</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <i className="fa-regular fa-user"></i>
              {"   "}
              <span className="badge bg-secondary ms-2">{name}</span>
            </li>
            <li className="list-group-item">
              <i className="fa-regular fa-envelope"></i>
              {"   "}
              <span className="badge bg-secondary ms-2">{email}</span>
            </li>
            <li className="list-group-item">
              <i className="fa-solid fa-user-tie"></i>
              {"   "}
              <span className="badge bg-secondary ms-2">
                {role ? "Admin" : "Client"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Layout
        title="Tableau De Bord"
        description={`Bienvenue ${name}`}
        className="container-fluid"
      >
        <div className="row">
          <div className="col-md-3 mx-auto mb-3">{sidebar()}</div>
          <div className="col-md-9 mx-auto">{adminInfo()}</div>
        </div>
      </Layout>
    </Fragment>
  );
};
export default AdminDashboard;
