import React, { useEffect, useState } from "react";
import Layout from "../../core/partials/Layout";
import sidebar from "../layouts/sidebar";
import {categoriesList} from "../../core/api/apiCore"
import isAuth from "../../auth/AuthService";
import { API_URL } from "../../config";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    photo: "",
    shipping: "",
    category: "",
  });

  const [formData, setFormData] = useState( new FormData())// eslint-disable-line no-use-before-define

  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    
    const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;

    formData.set(e.target.id, value)

    setProduct({ ...product, [e.target.id]: value });

  };
  
  const [categories, setCategories] = useState([]);
  useEffect(() => { 
    categoriesList().then(res => setCategories(res))
  },[]);
     
  // submit the form
  const submitProduct = (e) => {
    const {token, user} = isAuth()
    e.preventDefault();
    fetch(`${API_URL}api/product/create/${user._id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: formData
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error || result.errors) {
          let err = result.error ? result.error : result.errors.name.message
          toastr.error( err, 'Erreur,', {positionClass: "toast-top-center"} )
        } else {
          toastr.success( `Le produit ${result.product.name} à été créer.`, '',  {positionClass: "toast-top-center"})
          setProduct({
            name: "",
            description: "",
            price: 0,
            quantity: 1,
            photo: "",
            shipping: "",
            category: "",
          })
          formData.forEach((val, key) => formData.delete(key));
          navigate('/product/'+result.product._id);
        }
      })
      .catch((err) => {
        toastr.error(err, "Erreur serveur!", {
          positionClass: "toast-top-center",
        });
      });
  };

  const form = () => {
    return (
      <div className="row mx-auto py-5">
        <div className="col-md-9 mx-auto p-0">
          <h5 className="pb-2">Nouveau Produit</h5>
          <form onSubmit={submitProduct}>
              <div className="form-group">
                <label htmlFor="photo" className="form-label">Image Produit</label>
                <input onChange={handleChange} type="file" className="form-control" id="photo" name="photo" />
              </div>
            <div className="form-group">
              <label htmlFor="name" className="text form-label"></label>
              <input
                onChange={handleChange}
                id="name"
                type="text"
                className="form-control"
                value={product.name}
                placeholder="Nom Produit"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label"></label>
              <textarea
                onChange={handleChange}
                value={product.description}
                name="description"
                id="description"
                cols="30"
                rows="10"
                className="form-control"
                placeholder="Description du produit"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="form-label">Le Prix</label>
              <input
                onChange={handleChange}
                value={product.price}
                type="number"
                id="price"
                name="price"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">Quantitie</label>
              <input
                onChange={handleChange}
                value={product.quantity}
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">Categorie</label>
              <select onChange={handleChange} value={product.category} name="category" id="category" className="form-select">
                <option className="text-muted">Choisissez une categorie</option>
                {categories && categories.map((category, i) => (
                  <option key={i} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
                <label htmlFor="shipping" className="form-label">Shipping</label>
              <select onChange={handleChange} value={product.shipping} name="shipping" id="shipping" className="form-select">
                  <option className="text-muted">Livraison</option>
                  <option value="false">Non</option>
                  <option value="true">Oui</option>
              </select>
            </div>
            <div className="form-group">
            <button className="btn btn-outline-info my-3 btn-block text-white">Enregistrer</button>
            </div>
            {/* {JSON.stringify(product)} */}
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Layout
        title="Ajout Produit"
        description="Ajout D'une Produit"
        className="container-fluid"
      >
        <div className="row mt-3">
          <div className="col-md-3 mx-auto p-0">{sidebar()}</div>
          <div className="col-md-9 mx-auto">{form()}</div>
        </div>
      </Layout>
    </div>
  );
}
