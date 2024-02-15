import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { editItem, getOneCategory } from "../../core/api/apiCore";
import Layout from '../../core/partials/Layout';
import sidebar from "../layouts/sidebar";
import isAuth from "../../auth/AuthService";

const EditCategory = () => {

  let params = useParams();
  const navigate = useNavigate()

  const [category, setCategory] = useState({});
  const [formData, setFormData] = useState( new FormData()) // eslint-disable-line no-use-before-define

  let categoryId = params.id;

  useEffect(() => {
    getOneCategory(categoryId)
      .then((res) => {
        setCategory(res)
      })
      .catch((err) => console.log(err));
  }, [categoryId]);

  const previousPage = () => {
    navigate(-1);
  };


  // Assign input value to category properties (input onChange)
  const handleChange = (e) => {

    let value = e.target.value;

    formData.set(e.target.id, value)

  };

  // submit the form
  const submitCategory = (e) => {

    e.preventDefault();
    editItem
        (
            'api/category/update/',
            isAuth().token, 
            category, 
            navigate(-1), 
            formData
        );
  };

  const form = () => {
    return (
      <div className="row mx-auto py-5">
        <div className="col-md-9 mx-auto p-0">
          <h5 className="pb-2">Modification du {category.name}</h5>
          <form onSubmit={submitCategory}>
            <div className="form-group">
              <label htmlFor="name" className="text text-muted form-label"></label>
              <input
                onChange={handleChange}
                id="name"
                type="text"
                className="form-control"
                defaultValue={category.name}
              />
            </div>
            <div className="form-group">
            <button className="btn btn-outline-info my-3 btn-block text-white">Enregistrer</button>
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
        description={category ? category.name : "Categorie inexistant ou supprimer"}
        className="container-fluid"
        >
            <hr />
        <div className="row mt-3">
          <div className="col-md-3 mx-auto p-0">{sidebar()}</div>
          <div className="col-md-9 mx-auto">
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
            {form()}
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
            </div>
        </div>
        </Layout>
    </div>
  )
}

export default EditCategory