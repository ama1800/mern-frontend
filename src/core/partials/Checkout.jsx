import React from "react";
import { currencyFormatter } from "../api/helpers";
import isAuth from "../../auth/AuthService";
import { Link } from "react-router-dom";

const Checkout = ({ checked, onCheck, disabled, purchase, total, className }) => {

  return (
    <div className="h-100">
      <div className="card position-sticky top-0 h-100">
        <div className="p-3 bg-light bg-opacity-10">
          <h6 className="card-title mb-3">Résumé de la commande</h6>
          <div className="d-flex justify-content-between mb-1 small">
            <span>Sous-total</span>{" "}
            <span>{currencyFormatter(total * 100)}</span>
          </div>
          <div className="d-flex justify-content-between mb-1 small">
            <span>Expédition</span> <span>00.00€</span>
          </div>
          <div className="d-flex justify-content-between mb-1 small">
            <span>Coupon </span> <span className="text-danger">-00.00€</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4 small">
            <span>TOTAL</span>{" "}
            <strong className="text-dark">
              {currencyFormatter(total * 100)}
            </strong>
          </div>
          {isAuth().user && (
            <div>
              <div className="form-check mb-1 small">
                <input
                  className={`form-check-input ${className}`}
                  type="checkbox"
                  onChange={(e) => onCheck(e.target.checked)}
                  checked={checked}
                  id="tnc"
                />
                <label className="form-check-label" htmlFor="tnc">
                  J'accepte les<Link>conditions générales</Link>
                </label>
              </div>
              <div className="form-check mb-3 small">
                <input
                  className="form-check-input border border-primary"
                  type="checkbox"
                  value=""
                  id="subscribe"
                />
                <label className="form-check-label" htmlFor="subscribe">
                  Recevoir des courriels sur les mises à jour de produits et les
                  événements. Si vous changez d'avis, vous pouvez vous
                  désinscrire à tout moment.{" "}
                 <Link>Politique de confidentialité</Link>
                </label>
                <button
                  disabled={disabled}
                  onClick={() => purchase(true)}
                  className="btn btn-primary w-100 mt-3"
                >
                  Passer commande
                </button>
              </div>
            </div>
          )}
          {!isAuth().user && (
            <div>
              <Link to={{ pathname: "/signin", state: { from: "/cart" } }}>
              <button className="btn btn-info w-100 mt-2">
                Connection
              </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
