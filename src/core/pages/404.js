import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../partials/Layout";

const Page404 = () => {
  const navigate = useNavigate()
  const previousPage = () => {
    navigate(-1);
  };
  return (
    <Layout>
    <div>
        <div className="row justify-content-center">
            <div className="col-md-12 text-center">
                <span className="display-1 d-block">404</span>
                <div className="mb-4 lead">La page recherchée n'a pas été trouvée!</div>
                <button onClick={previousPage} className="btn btn-link text-light "><i className="fa fa-long-arrow-left"></i>{" "} Retour!</button>
            </div>
        </div>
      </div>
    </Layout>
  )
}
export default Page404