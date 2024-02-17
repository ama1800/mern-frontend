import moment from "moment";
import React from "react";
import { currencyFormatter } from "../api/helpers";
import ShowImage from "./ShowImage";

const ModalShowOrder = ({
  item = {},
  status = {},
  handleChange,
  closeClick,
  open,
  actualstatus,
}) => {

  const showInput = (k, v) => {
    return (
      <div className="form-group my-3">
        <label htmlFor={k}>{k}</label>
        <input id={k} value={v} readOnly type="text" className="form-control" />
      </div>
    );
  };

  return (
    <dialog
      open={open}
      className="border-0 z-2 bg-secondary vw-100 vh-100 position-fixed top-0 p-0 pt-2"
    >
      <div className="modal modal-content w-100 mx-auto pt-5">
        <div className="modal-header bg-primary text-white">
          <h6 className="modal-title" id="exampleModalLabel">
            Details commande de <b>{item.user.name}</b> passer{" "}
            {moment(item.createdAt).fromNow()}
          </h6>
          <button
            type="button"
            className="btn-close text-danger"
            onClick={() => closeClick()}
          ></button>
        </div>
        <div className="modal-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <p className="display-5">Détails de la commande</p>
                <ul className="list-group">
                  <dl className="list-group-item">
                    <dd>ID Transactions</dd>
                    <dt>{item.transaction_id}</dt>
                  </dl>
                  <dl className="list-group-item">
                    <dd>Client</dd>
                    <dt>{item.user.name}</dt>
                  </dl>
                  <dl className="list-group-item">
                    <dd>Total</dd>
                    <dt>{currencyFormatter(item.amount * 100)}</dt>
                  </dl>
                  <dl className="list-group-item">
                    <dd>Date</dd>
                    <dt>{moment(item.createdAt).fromNow()}</dt>
                  </dl>
                  <dl className="list-group-item">
                    <dd>Adresse Livraison</dd>
                    <dt>{item.address}</dt>
                  </dl>
                  <dl className="list-group-item">
                    <dd>Status Actuel</dd>
                    <dt>{status[item.status]}</dt>
                  </dl>
                  <dl className="list-group-item">
                    <div className="form-group">
                      <label htmlFor="category" className="form-label">
                        Changement De Status
                      </label>
                      <select
                        value={actualstatus}
                        onChange={(e) => handleChange(e)}
                        data-id={item._id}
                        name="status"
                        id="status"
                        className="form-select"
                      >
                        <option className="text-muted">Nouvelle Status</option>
                        {Object.entries(status).map((s, i) => (
                          <option key={i} value={s[0]}>
                            {s[1]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </dl>
                </ul>
              </div>
              <div className="col-md-6">
                    <p className="display-5">Liste des achats</p>
                <div className="row">
                  {item.products.map((product, i) => (
                    <div key={product._id} className="col-sm-6 col-md-12 col-lg-6 col-xl-4">
                        <div className="card bg-primary text-white mb-3">
                          <div className="card-header">{product.name}</div>
                          <div className="card-body">
                          <div className="text-center" width="90" height="90">
                              <ShowImage
                                className="img-thumbnail"
                                item={product}
                                width="90"
                                height="90"
                                url="api/product/photo"
                              />
                              </div>
                            {showInput("Nom Produit", product.name)}
                            {showInput("Prix Produit", currencyFormatter(product.price*100))}
                            {showInput("Quantité Produit", product.count)}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer bg-primary text-white">
            footer
        </div>
      </div>
    </dialog>
  );
};

export default ModalShowOrder;
