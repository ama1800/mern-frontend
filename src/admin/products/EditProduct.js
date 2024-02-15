import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOneProduct,
  categoriesList,
  editItem,
} from "../../core/api/apiCore";
import Layout from "../../core/partials/Layout";
import isAuth from "../../auth/AuthService";
import sidebar from "../layouts/sidebar";

const EditProduct = () => {

  const formRef = useRef();
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [actualCategoryId, setActualCategoryId] = useState("");
  const [actualShipping, setActualShipping] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [form, setForm] = useState(null);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoriesList().then((res) => setCategories(res));
  }, []);

  const productId = params.id;

  useEffect(() => {
    getOneProduct(productId)
      .then((res) => {
        setProduct(res);
        setActualCategoryId(res.category._id);
        setActualShipping(res.shipping);
      })
      .catch((err) => console.log(err));
  }, [productId]);

  const previousPage = () => {
    navigate(-1);
  };

  // Get form fields and populate formData
  useEffect(() => {
    if (product) {
      setForm(formRef.current);
    }
    if (form) {
      Array.from(form.elements).forEach((el) => {
        if (el.id && el.value) formData.set(el.id, el.value);
      });
    }
  }, [product, form, formData]);


  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    if (e.target.id === "category") setActualCategoryId(e.target.value);
    if (e.target.id === "shipping") setActualShipping(e.target.value);

    let value = e.target.id === "photo" ? e.target.files[0] : e.target.value;

    formData.set(e.target.id, value);
  };

  // submit the form
  const submitProduct = (e) => {
    e.preventDefault();
    editItem(
      "api/product/update/",
      isAuth().token,
      product,
      navigate("/product/" + product._id),
      formData,
      null
    );
  };

  const formHtml = () => {
    return (
      <div className="row mx-auto py-5">
        <div className="col-md-9 mx-auto p-0">
          <h5 className="pb-2">Modification du {product.name}</h5>
          <form onSubmit={submitProduct} ref={formRef}>
            <div className="form-group">
              <label htmlFor="photo" className="form-label">
                Image Produit
              </label>
              <input
                onChange={handleChange}
                type="file"
                className="form-control"
                id="photo"
                name="photo"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="name"
                className="text text-muted form-label"
              ></label>
              <input
                onChange={handleChange}
                id="name"
                type="text"
                className="form-control"
                defaultValue={product.name}
                placeholder="Nom Produit"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label"></label>
              <textarea
                onChange={handleChange}
                defaultValue={product.description}
                name="description"
                id="description"
                cols="30"
                rows="10"
                className="form-control"
                placeholder="Description du produit"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Le Prix
              </label>
              <input
                onChange={handleChange}
                defaultValue={product.price}
                type="number"
                id="price"
                name="price"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantitie
              </label>
              <input
                onChange={handleChange}
                defaultValue={product.quantity}
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Categorie
              </label>
              <select
                value={actualCategoryId}
                onChange={handleChange}
                name="category"
                id="category"
                className="form-select"
              >
                <option className="text-muted">Choisissez une categorie</option>
                {categories &&
                  categories.map((category, i) => (
                    <option key={i} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="shipping" className="form-label">
                Shipping
              </label>
              <select
                value={actualShipping}
                onChange={handleChange}
                name="shipping"
                id="shipping"
                className="form-select"
              >
                <option className="text-muted">Livraison</option>
                <option value="false">Non</option>
                <option value="true">Oui</option>
              </select>
            </div>
            <div className="form-group">
              <button className="btn btn-outline-info my-3 btn-block text-white">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Layout
        title="Edition Produit"
        description={product ? product.name : "Produit inexistant ou supprimer"}
        className="container-fluid"
      >
        <hr />
        <div className="row mt-3">
          <div className="col-md-3 mx-auto p-0">{sidebar()}</div>
          <div className="col-md-9 mx-auto">
            <div className="d-flex align-items-center">
              {" "}
              <i className="fa fa-long-arrow-left"></i>{" "}
              <span type="button" onClick={previousPage} className="ml-1">
                Retour
              </span>{" "}
            </div>{" "}
            {formHtml()}
            <div className="d-flex align-items-center">
              {" "}
              <i className="fa fa-long-arrow-left"></i>{" "}
              <span type="button" onClick={previousPage} className="ml-1">
                Retour
              </span>{" "}
            </div>{" "}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default EditProduct;
