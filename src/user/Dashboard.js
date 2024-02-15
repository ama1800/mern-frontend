import React, { Fragment, useEffect, useState } from "react";
import Layout from "../core/partials/Layout";
import isAuth from "../auth/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserOrders } from "../core/api/apiCore";
import { currencyFormatter } from "../core/api/helpers";
import moment from "moment";
import "moment/locale/fr";

const Dashboard = () => {

  const { user, token } = isAuth();
  let countItem = useSelector((state) => state.cart.count);
  const navigate = useNavigate()
  const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        userOrdersList();
    }, [])

  const userOrdersList = () => {
    getUserOrders(token, user._id).then(res => setUserOrders(res.orders))
  }

  const userInfo = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Information De L'utilisateur</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <i className="fa-regular fa-user"></i>
              {"   "}
              <span className="badge bg-secondary ms-2">{user.name}</span>
            </li>
            <li className="list-group-item">
              <i className="fa-regular fa-envelope"></i>
              {"   "}
              <span className="badge bg-secondary ms-2">{user.email}</span>
            </li>
            <li className="list-group-item">
              <i className="fa-solid fa-user-tie"></i>
              {"   "}
              <span className="badge bg-secondary ms-2">
                {user.role ? "Admin" : "Client"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const userHistory = () => {
    return (
        <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Historique D'achats</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <i className="fa-solid fa-clock-rotate-left"></i> Historique
            </li>
          </ul>
        </div>
      </div>
      {userOrders.length > 0 && (
      <div className="table-responsive table-borderless table-success table-striped-columns rounded overflow-hidden mt-2">
              <table className="table">
                <thead>
                  <tr>
                    <th>Commande N°</th>
                    <th>status</th>
                    <th>Total</th>
                    <th>Adresse</th>
                    <th>Date Commande</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {userOrders.map((order, i) => (
                    <tr key={order._id} className="cell-1">
                      <td>{order.transaction_id}</td>
                      <td>
                        <span className="badge bg-success">
                          {order.status}
                        </span>
                      </td>
                      <td>{currencyFormatter(order.amount * 100)}</td>
                      <td>{order.address}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
            
          {userOrders.length === 0 && (
            <div className="col-md-9">
              <p>
                Vous n'avez aucune précédent commande! Merci de visiter notre boutique.{" "}
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/shop")}
                >
                  <i className="fa-solid fa-shop"></i>
                </button>
              </p>
            </div>
          )}
      </>
    );
  };

  const userLinks = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Liens Utilisateur</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Link className="nav-link" to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="badge bg-danger rounded-circle position-absolute top-0">
                  {countItem}
                </span>
                <span className="ms-4">Panier </span>
              </Link>
            </li>
            <li className="list-group-item">
              <Link className="nav-link" to="/profile">
                <i className="fa-solid fa-id-card"></i>{" "}
                <span className="ms-3">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Layout
        title="Tableau de bord"
        description={`Bienvenue ${user.name}`}
        className="container-fluid"
      >
        <div className="row mt-3">
          <div className="col-md-3 mx-auto">{userLinks()}</div>
          <div className="col-md-9 mx-auto">
            <div>{userInfo()}</div>
            <hr />
            <div>{userHistory()}</div>
            {/* {orderToShow && detailsModal()}
            {orders.length === 0 && (
              <div className="alert alert-warning text-center my-5">
                Aucune commande!
              </div>
            )} */}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};
export default Dashboard;
