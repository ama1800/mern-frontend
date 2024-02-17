import React, { useState, useEffect } from "react";
import Layout from "../../core/partials/Layout";
import sidebar from "../layouts/sidebar";
import {
  changeOrderStatus,
  deleteItem,
  getOrders,
  getStatus,
} from "../../core/api/apiCore";
import isAuth from "../../auth/AuthService";
import { currencyFormatter } from "../../core/api/helpers";
import moment from "moment";
import "moment/locale/fr";
import ModalShowOrder from "../../core/partials/ModalShowOrder";
import Actions from "../../core/partials/Actions";
import ModalDelete from "../../core/partials/ModalDelete";

function Commandes() {
  const [orders, setOrders] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [actualStatus, setActualStatus] = useState(null);
  const [orderToModif, setOrderToModif] = useState({});
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
  }, [actualStatus]);

  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    if (e.target.id === "status") {
      changeOrderStatus(token, e.target.getAttribute("data-id"), {
        status: e.target.value,
      }).then((res) => setActualStatus(allStatus[res.order.status]));
    }
  };

  const handleClick = (e, order) => {
    setOrderToModif(order);
    if (e.target.getAttribute("data-item") === "show") {
      setOpenDetails(true);
      setActualStatus(allStatus[order.status]);
    }
    if (e.target.getAttribute("data-item") === "delete") setOpenDelete(true);
  };

  // Le modal details d'une commandes
  const detailsModal = () => {
    if (openDetails) {
      return (
        <ModalShowOrder
          handleChange={handleChange}
          actualstatus={allStatus[orderToModif.status]}
          status={allStatus}
          item={orderToModif}
          closeClick={() => {
            setOpenDetails(false);
            setActualStatus(null);
            setOrderToModif({});
          }}
          open={openDetails}
          className="border-0 rounded z-2 bg-transparent vw-100 vh-100 position-fixed top-0"
        />
      );
    }
  };

  // Le modal delete ainsi que les differentes methods ainsi que l'inversement du flux de données
  const deleteModal = () => {
    if (openDelete)
      return (
        <ModalDelete
          width={400}
          item={orderToModif}
          open={openDelete}
          closeClick={() => {
            setOpenDelete(false);
            setOrderToModif({});
          }}
          deleteAction={() =>
            deleteItem(
              "api/order/remove/",
              isAuth().token,
              orderToModif,
              setTimeout(() => {
                window.location.reload()
              }, 3000),
              setOpenDelete(!openDelete)
            )
          }
          className="border-0 rounded position-fixed bottom-50 start-0 z-2"
        />
      );
  };

  return (
    <Layout
      title="Les Commandes"
      description="Toutes les commandes"
      className="container-fluid"
    >
      <div className="row mt-3">
        <div className="col-md-3 mx-auto p-0 mb-4">{sidebar()}</div>
        <div className="col-md-9 px-1 mb-3">
          <div className="table-responsive">
            <table className="table table-borderless table-success table-striped-columns rounded overflow-hidden">
              <thead>
                <tr className="cell-1">
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
                {orders.length > 0 &&
                  orders.map((order, i) => (
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
                          {actualStatus ?? allStatus[order.status]}
                        </span>
                      </td>
                      <td>{currencyFormatter(order.amount * 100)}</td>
                      <td>{order.address}</td>
                      <td>{moment(order.createdAt).fromNow()}</td>
                      <td className="accordion" id="accordionId">
                        <Actions
                          item={order}
                          showModal={(e, item) => {
                            item = order;
                            handleClick(e, order);
                          }}
                          urlEdit={"/admin/commandes/edit/"}
                          modalId={`key${i}`}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {orderToModif && detailsModal()}
          {orderToModif && deleteModal()}
        </div>
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
