import React, { useState } from "react";
import Layout from "../core/partials/Layout";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // Navigate to url
  const navigate = useNavigate();
  // useState is a React Hook that lets you add a state variable to your component.
  // const [state, setState] = useState(initialState);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  // submit the form
  const submitSignup = (e) => {
    e.preventDefault();
    fetch(`${API_URL}api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errs) {
          const listErros = () => {
            let errorList = `
              <div className="card shadow mb-4">
                  <div className="card-body p-5">
                      <h6 className="mb-4">Erreurs qui empêchent votre inscription:</h6>
                      <ol className="list-bullets">`,
                      error = "";
                    for (let err of result.errs) {
                      if (err !== error)
                        errorList += `<li className="mb-2">${err}</li>`;
                      error = err;
                    }
                    errorList += `
                      </ol>
                  </div>
              </div>`;
            return errorList;
          };
          toastr.warning(listErros(), "", {
            positionClass: "toast-top-center",
          });
        } else {
          toastr.info(
            "Votre compte a été créer. Veuillez-vous connecter!",
            "Nouvelle Iscription",
            { positionClass: "toast-top-center" }
          );
          navigate("/signin");
        }
      })
      .catch((err) =>
        toastr.error(err, "Erreur serveur!", {
          positionClass: "toast-top-center",
        })
      );
  };
  const form = () => {
    return (
      <form onSubmit={submitSignup}>
        <div className="card p-2 ">
          <h3 className="text-uppercase text-center">Creation De Compte</h3>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="name" className="text">
                Nom
              </label>
              <input
                onChange={handleChange}
                autoFocus
                type="text"
                className="form-control my-3"
                id="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text">
                Email
              </label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control my-3"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text">
                Mot De Passe
              </label>
              <input
                onChange={handleChange}
                type="password"
                className="form-control my-3"
                id="password"
              />
            </div>
            <button className="btn btn-block btn-outline-primary">
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    );
  };
  return (
    <div>
      <Layout
        title="Page D'Inscription"
        description="Inscription Node React Ecommerce"
        className="container"
      >
        <div className="row mt-3">
          <div className="col-md-6 mx-auto">{form()}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Signup;
