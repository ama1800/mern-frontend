import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowImage from "../partials/ShowImage";
import Layout from "../partials/Layout";
import Checkout from "../partials/Checkout";
import {
  decProductCount,
  incProductCount,
  removeProduct,
} from "../../actions/cartActions";
import {
  createOrder,
  editItem,
  getBraintreeToken,
  payementProcess,
} from "../api/apiCore";
import { useNavigate } from "react-router-dom";
import isAuth from "../../auth/AuthService";
import DropIn from "braintree-web-drop-in-react";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { emptyCart } from "../api/helpers";
import ShippingForm from "../partials/ShippingForm";
import { currencyFormatter } from "../api/helpers";

const Cart = () => {
  let productsInCart = useSelector((state) => state.cart.products);
  const dispach = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const [pay, setPay] = useState(false);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState(new FormData());

  const [data, setData] = useState({
    brainToken: null,
    error: null,
    instance: {},
  });

  const userId = isAuth() && isAuth().user._id;
  const tokenUser = isAuth() && isAuth().token;

  useEffect(() => {
    setTotal(
      productsInCart.reduce(
        (total, product) => total + product.price * product.count,
        0
      )
    );
  }, [productsInCart]);

  useEffect(() => {
    if (pay) {
      if (isAuth()) {
        getBraintreeToken(userId, tokenUser)
          .then((res) => setData({ ...data, brainToken: res.token }))
          .catch((err) => setData({ ...data, error: err }));
      }
    }
  }, [pay]);

  const buy = () => {
    if (total > 0) {
      data.instance
        .requestPaymentMethod()
        .then((res) => {
          let paymentData = {
            amount: productsInCart.reduce(
              (total, product) => total + product.price * product.count,
              0
            ),
            paymentMethodNonce: res.nonce,
          };
          payementProcess(userId, tokenUser, paymentData)
            .then(async (res) => {
              let dataOrder = {
                products: productsInCart,
                transaction_id: res.transaction.id,
                amount: res.transaction.amount,
                address: `${formData.get("address")} ${formData.get(
                  "zipCode"
                )} ${formData.get("city")}`,
              };
              editItem(
                "api/user/profile/",
                isAuth().token,
                isAuth().user,
                null,
                formData
              );
              createOrder(userId, tokenUser, dataOrder)
                .then((res) => {
                  emptyCart(dispach, productsInCart, removeProduct, () => {
                    navigate("/shop");
                    toastr.success(
                      `Paiement Validé!`,
                      "Merci, le paiement effectué avec succés.",
                      {
                        positionClass: "toast-top-center",
                      }
                    );
                  });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          toastr.error(err, "Erreur Paiement Non Validé!", err.message, {
            positionClass: "toast-top-center",
          });
        });
    }else {
      toastr.error(
        `Aucun paiement à faire!`,
        "Vous n'avez rien à payer.",
        {
          positionClass: "toast-top-center",
        }
      );
    }
  };

  const formShipping = () => (
    <div>
      <>
        {purchase && productsInCart.length > 0 && (
          <ShippingForm
            user={isAuth().user}
            submitShipping={submitShipping}
            handleCh={handleChange}
            ref={formRef}
            pay={setPay}
            disabled={pay}
            retour={() => navigate('/shop')}
          />
        )}
      </>
    </div>
  );

  // Initialisation of formData on form loaded
  useEffect(() => {
    if (pay) {
      Array.from(formRef.current.elements).forEach((el) => {
        if (el.id) formData.set(el.id, el.value);
        if (!el.value && el.nodeName === "INPUT")
          el.style.border = "1px solid red";
      });
    }
  }, [pay, formData]);

  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    formData.set(e.target.id, e.target.value);
    e.target.style.border = !e.target.value ? "1px solid red" : "unset";
  };

  const submitShipping = (e) => {
    e.preventDefault();
  };

  const dropIn = () => (
    <div className="bg-success-subtle p-4 rounded">
      {pay && data.brainToken !== null && productsInCart.length > 0 && (
        <>
          <DropIn
            options={{
              authorization: data.brainToken,
              paypal: { flow: "vault" },
              locale: "fr",
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <div onClick={buy} className="btn btn-primary w-100">
            Paiement
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      <Layout
        title="Votre Panier"
        description="Liste des Produits dans le Panier"
        className="container-fluid"
      >
        <div className="row">
          {productsInCart.length > 0 && (
            <>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-success table-striped-columns rounded overflow-hidden">
                      <thead className="table-light">
                        <tr>
                          <th className="align-middle text-center">Supprimer</th>
                          <th className="align-middle text-center">Image</th>
                          <th className="align-middle text-center">Nom</th>
                          <th className="align-middle text-center">Quantitie</th>
                          <th className="align-middle text-center">Prix</th>
                          <th className="align-middle text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsInCart.map((product, i) => (
                          <tr key={product._id}>
                            <td className="align-middle text-center" width="50px">
                              <button
                                className="btn btn-outline-lighmr-1 px-2"
                                onClick={() =>
                                  dispach(removeProduct(product._id))
                                }
                              >
                                <i className="fa fa-trash w-100 text-danger"></i>
                              </button>
                            </td>
                            <td className="align-middle text-center">
                              <ShowImage
                                className="img-thumbnail align-middle"
                                item={product}
                                width="50"
                                height="50"
                                url="api/product/photo"
                              />
                            </td>
                            <td className="align-middle text-center">{product.name}</td>
                            <td className="align-middle text-center">
                                <div className="container mx-0">
                                  <div className="row">
                                    <div className="col px-0  text-center">
                                      <div className="row">
                                        <div className="col-12 px-0 pb-2">
                                          <button
                                            onClick={() =>
                                              dispach(incProductCount(product))
                                            }
                                            className="btn btn-info py-0 px-1"
                                            disabled={
                                              product.count >= product.quantity ? true : false
                                            }
                                          >
                                            <i className="fa-solid fa-plus"></i>
                                          </button>
                                        </div>
                                        <div className="col-12 px-0">
                                      <button
                                        onClick={() =>
                                          dispach(decProductCount(product))
                                        }
                                        className="btn btn-secondary py-0 px-1"
                                        disabled={
                                          product.count < 1 ? true : false
                                        }
                                      >
                                        <i className="fa-solid fa-minus"></i>
                                      </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col px-0">
                                          <h4 className="mt-3">
                                            <span className="span span-success">
                                              {product.count}
                                            </span>
                                          </h4>
                                    </div>
                                  </div>
                                </div>
                            </td>
                            <td className="align-middle text-center">
                              {currencyFormatter(product.price * 100) ?? 0}
                            </td>
                            <td className="align-middle text-center">
                              {currencyFormatter(
                                product.price * 100 * product.count
                              ) ?? 0}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-12">{pay && dropIn()}</div>
                  <div className="col-md-12">{formShipping()}</div>
                </div>
              </div>
              <div className="col-md-3">
                <Checkout
                  products={productsInCart}
                  checked={isTermsAccepted}
                  onCheck={setIsTermsAccepted}
                  disabled={!isTermsAccepted}
                  purchase={setPurchase}
                  total={total}
                  className={
                    isTermsAccepted
                      ? "border border-primary"
                      : "border border-danger"
                  }
                />
              </div>
            </>
          )}
          {productsInCart.length === 0 && (
            <div className="col-md-9">
              <p>
                Votre Panier est vide visitez notre boutique{" "}
                <button
                  className="btn btn-outline-light"
                  onClick={() => navigate("/shop")}
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
              </p>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Cart;
