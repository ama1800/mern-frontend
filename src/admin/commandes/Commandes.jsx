import React, { useState, useEffect } from "react";
import Layout from "../../core/partials/Layout";
import sidebar from "../layouts/sidebar";
import {
  changeOrderStatus,
  getOrders,
  getStatus,
} from "../../core/api/apiCore";
import isAuth from "../../auth/AuthService";
import { currencyFormatter } from "../../core/api/helpers";
import moment from "moment";
import "moment/locale/fr";
import ModalShowOrder from "../../core/partials/ModalShowOrder";
import Actions from "../../core/partials/Actions";

function Commandes() {

  const [orders, setOrders] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [actualStatus, setActualStatus] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [idOrderToShow, setIdOrderToShow] = useState(null);
  const [orderToShow, setOrderToShow] = useState({});
  const [allStatus, setAllStatus] = useState([]);

  const { token, user } = isAuth();
  const translation = [
    "Prise En Charge",
    "En Traitement",
    "En Livraison",
    "Livrée",
    "Annulée",
  ];

  const loadOrders = () => {
    getOrders(token, user._id).then((res) => setOrders(res.orders));
    getStatus(token, user._id).then((res) => {
      const result = translation.reduce((result, field, index) => {
        result[res.status[index]] = field;
        return result;
      }, {});
      setAllStatus(result);
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (idOrderToShow) {
      const orderById = (order) => {
        return order._id === idOrderToShow;
      };
      const ord = orders.find(orderById);
      setOrderToShow(ord);
      setActualStatus(allStatus[ord.status]);
      setOpenDetails(true);
    }
  }, [idOrderToShow, allStatus, orders]);

  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    if (e.target.id === "status") setNewStatus(e.target.value);
  };

  const handleClick = (e) => {
    setIdOrderToShow(e.target.getAttribute("data-itemtoshow"));
  };

  useEffect(() => {
    if (newStatus && idOrderToShow) {
      changeOrderStatus(token, idOrderToShow, { status: newStatus }).then(
      (res) => setActualStatus(res.order.status)
    );
    }
  }, [idOrderToShow, newStatus]);

  // Le modal details d'une commandes
  const detailsModal = () => {
    if (openDetails && allStatus && orderToShow) {
      return (
        <ModalShowOrder
          handleChange={handleChange}
          actualstatus={allStatus[actualStatus]}
          status={allStatus}
          item={orderToShow}
          closeClick={() => {
            setOpenDetails(false);
            setIdOrderToShow(null);
            setActualStatus(null);
            setOrderToShow({});
          }}
          open={openDetails}
          className="border-0 rounded z-2 bg-transparent vw-100 vh-100 position-fixed top-0"
        />
      );
    }
  };

  return (
    <Layout
      title="Les Commandes"
      description="Toutes les commandes"
      className="container-fluid"
    >
      <div className="row mt-3">
        <div className="col-md-3 mx-auto p-0 mb-4">{sidebar()}</div>
        {orders.length && (
          <div className="col-md-9 px-1 mb-3">
            <div className="table-responsive table-borderless table-success table-striped-columns rounded overflow-hidden">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">
                      <div className="toggle-btn">
                        <div className="inner-circle"></div>
                      </div>
                    </th>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>status</th>
                    <th>Total</th>
                    <th>Adresse</th>
                    <th>Date Commande</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {orders.map((order, i) => (
                    <tr key={order._id} className="cell-1">
                      <td className="text-center">
                        <div className="toggle-btn">
                          <div className="inner-circle"></div>
                        </div>
                      </td>
                      <td>{order.transaction_id}</td>
                      <td>{order.user.name}</td>
                      <td>
                        <span className="badge bg-success">
                          {allStatus[order.status]}
                        </span>
                      </td>
                      <td>{currencyFormatter(order.amount * 100)}</td>
                      <td>{order.address}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td className="accordion" id="accordionId">
                        <Actions
                          item={order}
                          showModal={handleClick}
                          urlEdit={"/admin/commandes/edit/"}
                          modalId={`key${i}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orderToShow && detailsModal()}
          </div>
        )}
      </div>
      {orders.length === 0 && (
        <div className="alert alert-warning text-center my-5">
          Aucune commande!
        </div>
      )}
    </Layout>
  );
}

export default Commandes;
