import React, { useEffect, useState } from "react";
import { getOneProduct, relatedProducts, deleteItem } from "../api/apiCore";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../partials/Layout";
import ShowImage from "../partials/ShowImage";
import ProductCard from "../product/Card";
import isAuth from "../../auth/AuthService";
import "toastr/build/toastr.css";
import ModalDelete from "../partials/ModalDelete";

const ShowProduct = () => {
  
  const navigate = useNavigate();
  
  const productImageRef = React.createRef();
  const productImage = React.createRef();

  let params = useParams();

  const [product, setProduct] = useState({});
  const [productsRelated, setProductsRelated] = useState([]);
  const [open, setOpen] = useState(false)

  let productId = params.id;
  useEffect(() => {
    getOneProduct(productId)
      .then((res) => {
        setProduct(res);
        return relatedProducts(productId);
      })
      .then((related) => setProductsRelated(related))
      .catch((err) => console.log(err));
  }, [productId]);

  const changeImage = (e) => {
    productImage.current.src = e.target.src;
  };

  const previousPage = () => {
    navigate(-1);
  };

  const showModal = (e) => {
    setIdProductToDelete(e.target.getAttribute('data-id'))
     setOpen(!open)
   }

   const [idProductToDelete, setIdProductToDelete] = useState(null)
   const [productToDelete, setProductToDelete] = useState({})

  // Au click sur supprimer recherche du produit à supprimer et affichage du modal
  useEffect(() => {
    if(idProductToDelete){
    const productById = product => {
      return product._id === idProductToDelete
    }
    const prod = productsRelated.find((productById))
      if(prod) {
        setProductToDelete(prod)
      } else setProductToDelete(product)
      setOpen(true)
    }
    // reinitialisation de l'id apres son utilisation
    setIdProductToDelete(null)
    // Observe les changement de l'id
  },[idProductToDelete, product, productsRelated])
  // Le modal ainsi que les differentes methods ainsi que l'inversement du flux de données
   const leModal = () => {
     if(open) return (<ModalDelete
      width={400}
       item={productToDelete} 
       open={open} 
       closeClick={() => {setOpen(false); setProductToDelete({})}} 
       deleteAction={() => deleteItem('api/product/remove/', isAuth().token, productToDelete, navigate('/admin/products'), setOpen(!open), setProductToDelete({}))} 
       className="border-0 rounded position-fixed bottom-50 start-0 z-2"/>)
   }

  //  const leModal = () => {
  //    if(open) return (<ModalDelete 
  //      item={product} 
  //      open={open} 
  //      closeClick={() => setOpen(false)} 
  //      deleteAction={() => deleteItem('api/product/remove/', isAuth().token, product, navigate("/shop"), setOpen(!open))} 
  //      className="border-0 rounded position-fixed bottom-50 start-0 z-1"/>)
  //  }
  return (
    <div>
      <Layout
        title="Page Produit"
        description={product ? product.name : "Produit inexistant ou supprimer"}
        className="container-fluid"
      >
        <hr />
        <div className="container-fluid mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-9 mb-3">
              {product && product.name && (
                <>
                  <h3>{product.name}</h3>
                  <div className="card">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="images p-3">
                          <div className="text-center p-4">
                            {" "}
                            <ShowImage
                              className=""
                              item={product}
                              url="api/product/photo"
                              ref={productImage}
                              id="main-image"
                            />{" "}
                          </div>
                          <div className="thumbnail text-center d-flex">
                            {" "}
                            <div>
                              <img
                                onClick={changeImage}
                                src="https://i.imgur.com/Rx7uKd0.jpg"
                                width="70"
                                alt="product"
                              />{" "}
                            </div>
                            <div>
                              <img
                                onClick={changeImage}
                                src="https://i.imgur.com/Dhebu4F.jpg"
                                width="70"
                                alt="product"
                              />{" "}
                            </div>
                            <div onClick={changeImage}>
                              <ShowImage
                                className=""
                                item={product}
                                url="api/product/photo"
                                style={{ width: "70px", height: "70px" }}
                                width="70"
                                ref={productImageRef}
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="product p-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              {" "}
                              <i className="fa fa-long-arrow-left"></i>{" "}
                              <span
                                type="button"
                                onClick={previousPage}
                                className="ml-1"
                              >
                                Retour
                              </span>{" "}
                            </div>{" "}
                            <i className="fa fa-shopping-cart text-muted"></i>
                          </div>
                          <div className="mt-4 mb-3">
                            {" "}
                            <span className="text-uppercase text-muted brand">
                              {product.category?.name || 'Undefined'}
                            </span>
                            <h5 className="text-uppercase">{product.name}</h5>
                            <div className="price d-flex flex-row align-items-center">
                              {" "}
                              <span className="act-price">
                                {product.price?? 0}€
                              </span>
                              <div className="ml-2">
                                {" "}
                                <small className="dis-price">
                                  {product.price? product.price * 2 : 0}€
                                </small>{" "}
                                <span>
                                  MOINS{" "}
                                  {product.price ? Math.floor(
                                    ((product.price * 2 -
                                      parseInt(product.price)) /
                                      (product.price * 2)) *
                                      100
                                  ) : 0}
                                  %
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                          <p className="about">{product.description}</p>
                          <div className="sizes mt-5">
                            <h6 className="text-uppercase">Taille</h6>{" "}
                            <label className="radio">
                              {" "}
                              <input
                                type="radio"
                                name="size"
                                value="S"
                                defaultChecked
                              />{" "}
                              <span>S</span>{" "}
                            </label>{" "}
                            <label className="radio">
                              {" "}
                              <input type="radio" name="size" value="M" />{" "}
                              <span>M</span>{" "}
                            </label>{" "}
                            <label className="radio">
                              {" "}
                              <input type="radio" name="size" value="L" />{" "}
                              <span>L</span>{" "}
                            </label>{" "}
                            <label className="radio">
                              {" "}
                              <input type="radio" name="size" value="XL" />{" "}
                              <span>XL</span>{" "}
                            </label>{" "}
                            <label className="radio">
                              {" "}
                              <input
                                type="radio"
                                name="size"
                                value="XXL"
                              />{" "}
                              <span>XXL</span>{" "}
                            </label>
                          </div>
                          <div className="cart mt-4 align-items-center">
                            {" "}
                            <button className="btn btn-danger text-uppercase mr-2 px-2">
                              Ajouter au panier
                            </button>{" "}
                            <i className="fa fa-heart text-muted"></i>{" "}
                            <i className="fa fa-share-alt text-muted"></i>{" "}
                          </div>
                        </div>
                        <div className="position-absolute bottom-0 end-0">
                          {product && isAuth() && isAuth().user.role === 1 && (
                            <div>
                              <Link to="">
                                <button
                                  className="btn btn-outline-lighmr-1 p-0 text-warning"
                                  data-id={product._id}
                                  onClick={showModal}
                                >
                                  <i className="fa fa-trash w-100"></i>
                                </button>
                              </Link>
                              <Link to={`/admin/products/edit/${product._id}`}>
                                <button className="btn btn-outline-ligh mr-1 p-0 text-warning">
                                  <i className="fa fa-edit w-100"></i>
                                </button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-md-3">
              <h3>Produits Similaires</h3>
              {productsRelated &&
                productsRelated.map((product, i) => (
                  <ProductCard key={product._id} product={product} onShowModal={ setIdProductToDelete } />
                ))}
            </div>
          </div>
        </div>
        {product && leModal()}
      </Layout>
    </div>
  );
};
export default ShowProduct;
