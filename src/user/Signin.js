import React, { useState } from 'react';
import Layout from '../core/partials/Layout';
import { API_URL} from "../config";
import { useNavigate } from "react-router-dom";
import toastr from 'toastr';
import 'toastr/build/toastr.css';

const Signin = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

const handleChange = e => {
  setUser({...user, [e.target.id]: e.target.value})
}

const submitSignin = e => {
  e.preventDefault();
  fetch(`${API_URL}api/signin`, {
    method: "POST",
    headers: {
      "Accept":'application/json',
      "Content-type": 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(result => {
      if (result.error) {
        toastr.error( result.error, 'Erreur,', {positionClass: "toast-top-center"} )
      } else {
        toastr.success( `Bienvenue ${result.user.name}`, 'Vous êtes connectez',  {positionClass: "toast-top-center"})
        localStorage.setItem('jwt_info', JSON.stringify(result))
        navigate('/');
      }
    })
    .catch(err => toastr.error( err, 'Erreur serveur!',  {positionClass: "toast-top-center"}))
  }
    const form = () => {
      return (
        <form onSubmit={submitSignin}>
          <div className="card jumbotron p-5">
            <h3 className="text-uppercase text-center">Connectez-vous!</h3>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="email" className="text text-white">Email</label>
                <input autoFocus onChange={handleChange} value={user.email} type="text" className="form-control my-3" id="email" required name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text text-white">Mot De Passe</label>
                <input onChange={handleChange} type="password" className="form-control my-3" id="password" required />
              </div>
              <button className="btn btn-block btn-outline-warning text-white bg-gradient-light">
                Se Connecter
              </button>
            </div>
          </div>
        </form>
      );
    };
  return (
    <div>
      <Layout 
        title="Page De Connection" 
        description="Connection Node React Ecommerce" 
        className="container-fluid"
      >
        <div className="row mt-3">
          <div className="col-md-6 mx-auto">
        { form() }
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Signin