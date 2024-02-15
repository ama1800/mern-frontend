import React, { useState } from "react";
import Layout from "../../core/partials/Layout";
import isAuth from "../../auth/AuthService";
import { API_URL } from "../../config";
import sidebar from "../layouts/sidebar";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {

  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
  });

  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value });
  };

  const { user, token } = isAuth()

  // submit the form
  const submitCategory = (e) => {
    e.preventDefault();
    fetch(`${API_URL}api/category/create/${user._id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error || result.errors) {
          let err = result.error ? result.error : result.errors.name.message
          toastr.error( err, 'Erreur,', {positionClass: "toast-top-center"} )
        } else {
          toastr.success( `La catégorie ${result.category.name} à été créer.`, '',  {positionClass: "toast-top-center"})
          setCategory('')
          navigate('/admin/categories');
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
          <h5>Nouvelle Categorie</h5>
          <form onSubmit={submitCategory}>
            <div className="form-group">
              <label htmlFor="name" className="text form-label">
                Nom Categorie
              </label>
              <input
                onChange={handleChange}
                autoFocus
                required
                value={category.name}
                id="name"
                type="text"
                className="form-control my-3"
              />
            </div>
            <button className="btn btn-block btn-outline-warning text-white bg-gradient-light">Enregistrer</button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Layout
        title="Ajout Categorie"
        description="Ajout D'une Categorie"
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
