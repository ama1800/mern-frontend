import React from "react";

const ShippingForm = React.forwardRef(
  ({ user, submitShipping, handleCh, pay, disabled, retour }, ref) => {
    return (
      <div className="row mt-3" style={{ marginTop: "25px" }}>
        <div className="col-md-3">
          <div
            style={{ marginTop: "50px", marginLeft: "10px" }}
            className="text-center"
          >
            <i
              id="animationDemo"
              data-mdb-animation="slide-right"
              data-mdb-toggle="animation"
              data-mdb-animation-reset="true"
              data-mdb-animation-start="onScroll"
              data-mdb-animation-on-scroll="repeat"
              className="fas fa-3x fa-shipping-fast text-white"
            ></i>
            <h3 className="mt-3 text-white">Bienvenue</h3>
            <p className="white-text">
              Vous êtes à 30 secondes de compléter votre commande !
            </p>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-white btn-rounded back-button"
              onClick={() => retour()}
            >
              Retour
            </button>
          </div>
        </div>
        <div className="col-md-9 justify-content-center">
          <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: "#495057" }}>Livraison & Facturation</h4>
              </div>
              <form
                onSubmit={(e) => submitShipping(e)}
                ref={ref}
                className="mb-0"
              >
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        onChange={(e) => handleCh(e)}
                        type="text"
                        id="name"
                        className="form-control input-custom"
                        defaultValue={user.name}
                      />
                      <label className="form-label" htmlFor="name">
                        Nom
                      </label>
                    </div>
                  </div>
                    <div className="col">
                      <div className="form-outline">
                        <input
                          onChange={(e) => handleCh(e)}
                          type="tel"
                          id="phone"
                          pattern="[0-9 ]+"
                          className="form-control input-custom"
                          defaultValue={user.phone ?? ""}
                        />
                        <label className="form-label" htmlFor="phone">
                          Téléphone
                        </label>
                      </div>
                    </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        onChange={(e) => handleCh(e)}
                        type="text"
                        id="city"
                        className="form-control input-custom"
                        defaultValue={user.city ?? ""}
                      />
                      <label className="form-label" htmlFor="city">
                        Ville
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        onChange={(e) => handleCh(e)}
                        type="text"
                        id="zipCode"
                        className="form-control input-custom"
                        defaultValue={user.zipCode ?? ""}
                      />
                      <label className="form-label" htmlFor="zipCode">
                        Code Postal
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input
                        onChange={(e) => handleCh(e)}
                        type="text"
                        id="address"
                        className="form-control input-custom"
                        defaultValue={user.address}
                      />
                      <label className="form-label" htmlFor="address">
                        Adresse
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        onChange={(e) => handleCh(e)}
                        type="email"
                        id="email"
                        className="form-control input-custom"
                        defaultValue={user.email}
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                    </div>
                  </div>
                </div>
                <div className="float-end ">
                <button
                  onClick={() => pay(true)}
                  className="btn btn-primary btn-rounded"
                  style={{backgroundColor: '#0062CC'}}
                  disabled={disabled}
                >
                  Paiement
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ShippingForm;
