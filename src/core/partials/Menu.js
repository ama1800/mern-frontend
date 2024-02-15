import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import toastr from "toastr";
import "toastr/build/toastr.css";
import isAuth from "../../auth/AuthService";
import { useSelector } from "react-redux";

const Menu = () => {
  const navigate = useNavigate();
  let countItem = useSelector((state) => state.cart.count);
  // Signout
  const signout = () => {
    if (isAuth().user) {
      fetch(`${API_URL}api/signout`)
        .then(() => {
          toastr.info("Vous Êtes Déconnecter.", "", {
            positionClass: "toast-top-center",
          });
          localStorage.removeItem("jwt_info");
          navigate("/signin");
        })
        .catch((err) => console.log(err));
    } else {
      toastr.info("Vous n'êtes pas connecter!", "", {
        positionClass: "toast-top-center",
      });
      navigate("/signin");
    }
  };

  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "#ffbf00" };
    } else {
      return { color: "#fff" };
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-success border border-primary-subtle px-1">
        <Link className="navbar-brand" to="/">
          Ecommerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#basicExampleNav"
          aria-controls="basicExampleNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="basicExampleNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <Link style={isActive("/")} className="nav-Link ps-2" to="/">
                <i className="fa-solid fa-house"></i> Accueil
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                style={isActive("/shop")}
                className="nav-Link ps-2"
                to="/shop"
              >
                <i className="fa-brands fa-shopify"></i> Boutique
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            {isAuth() && (
              <>
                <li className="nav-item active">
                  <Link
                    style={isActive("/dashboard")}
                    className="nav-Link ps-2"
                    to={`${
                      isAuth() && isAuth().user.role === 1 ? "/admin" : ""
                    }/dashboard`}
                  >
                    <i className="fa-regular fa-user"></i> Tableau De Bord
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </>
            )}
            {/* <li className="nav-item dropdown">
              <Link
                className="nav-Link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <div
                className="dropdown-menu dropdown-primary"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="#">
                  Action
                </Link>
                <Link className="dropdown-item" to="#">
                  Another action
                </Link>
                <Link className="dropdown-item" to="#">
                  Something else here
                </Link>
              </div>
            </li> */}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isAuth() && (
              <>
                <li className="nav-item">
                  <Link
                    style={isActive("/signin")}
                    className="nav-Link ps-2"
                    to="/signin"
                  >
                    <i className="fas fa-sign-in-alt"></i> Connection
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={isActive("/signup")}
                    className="nav-Link ps-2"
                    to="signup"
                  >
                    <i className="fas fa-user-plus"></i> Inscription
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </>
            )}
            {isAuth() && (
              <>
                <li className="nav-item">
                  <Link
                    onClick={signout}
                    className="nav-link ps-2"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fa-solid fa-power-off"></i>
                    Déconnection
                  </Link>
                </li>
              </>
            )}
                <li className="nav-item">
                  <Link className="nav-link pe-4 position-relative" style={{ cursor: "pointer" }} to={'/cart'}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="badge bg-danger rounded-circle position-absolute top-0">
                      {countItem}
                    </span>
                  </Link>
                </li>
            <form className="form-inline px-2">
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Recherche"
                  aria-label="Search"
                />
              </div>
            </form>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Menu;
