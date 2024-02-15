import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ShowImage from "../partials/ShowImage";
import isAuth from "../../auth/AuthService";
import { addToCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

const ProductCard = ({ product, onShowModal, children }) => {
  let dispach = useDispatch()
  const showStock= (quantity) => {
    return quantity > 0 ? <span className="badge bg-primary">{quantity} Au Stock</span> : <span className="badge bg-danger">Stock Epuiser</span>
  }

  return (
    <div
      style={{ maxWidth: "300px", height: "500px" }}
      className="card bg-dark text-white mb-4 shadow mx-auto"
    >
      <div className="card-header">
        <h4>{product.name}</h4>
      </div>
      <div className="images" style={{ height: "220px" }}>
        <ShowImage
          className="img-thumbnail align-middle"
          item={product}
          width="100%"
          height="250"
          url="api/product/photo"
        />
      </div>
      <div className="card-body position-relative">
        <p style={{ textAlign: "justify" }} className="card-text">
          {product.description.slice(0, 80) + "  "}
          <Link to={`/product/${product._id}`} className="link-info">
            Plus...
          </Link>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span
            style={{ width: "50px", height: "50px" }}
            className="badge bg-danger rounded-circle p-0 pt-3 fs-6"
          >
            {product.price??0}€
          </span>
          <p className="badge rounded-pill bg-light text-dark p-1">
            {product.category?.name || "Undefined"}
          </p>
        </div>
        <div className="position-absolute bottom-0 start-0 p-1">{showStock(product.quantity)}</div>
        <div className="position-absolute bottom-0 end-0 px-1">
              {product.quantity > 0 && (
            <button className="btn btn-outline-ligh p-0 text-warning" onClick={() => dispach(addToCart(product))}>
              <i className="fa-solid fa-cart-shopping w-100"></i>
            </button>
              )}
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-lighmr-1 p-0 text-warning">
              <i className="fa-solid fa-eye w-100"></i>
            </button>
          </Link>
          {isAuth() && isAuth().user.role === 1 && (
            <Fragment>
              <Link to="">
                <button className="btn btn-outline-ligh mr-1 p-0 text-warning">
                  <i className="fa fa-upload w-100"></i>
                </button>
              </Link>
              <Link>
                <button
                  className="btn btn-outline-lighmr-1 p-0 text-warning"
                  onClick={(e) => onShowModal(e.target.getAttribute("data-id"))}
                  data-id={product._id}
                >
                  <i className="fa fa-trash w-100"></i>
                </button>
              </Link>
              <Link to={`/admin/products/edit/${product._id}`}>
                <button className="btn btn-outline-ligh mr-1 p-0 text-warning">
                  <i className="fa fa-edit w-100"></i>
                </button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};
export default ProductCard;
