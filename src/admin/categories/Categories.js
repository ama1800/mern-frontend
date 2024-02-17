import React, { useState, useEffect } from "react";
import sidebar from "../layouts/sidebar";
import Layout from "../../core/partials/Layout";
import { categoriesList, deleteItem } from "../../core/api/apiCore";
import moment from "moment";
import "moment/locale/fr";
import ModalDelete from "../../core/partials/ModalDelete";
import isAuth from "../../auth/AuthService";
import { Link, useNavigate } from "react-router-dom";
import Actions from "../../core/partials/Actions";

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoriesList().then((res) => setCategories(res));
  }, []);

  const [open, setOpen] = useState(false);
  const [categoryToModif, setCategoryToModif] = useState({});

  const showModal = (e, category) => {
    if(e.target.getAttribute("data-item") === 'delete'){
      setCategoryToModif(category);
      setOpen(true);
    }
  };
  const leModal = () => {
    if (open)
      return (
        <ModalDelete
          item={categoryToModif}
          open={open}
          closeClick={() => setOpen(false)}
          deleteAction={() =>
            deleteItem(
              "api/category/remove/",
              isAuth().token,
              categoryToModif,
              setTimeout(() => {
                window.location.reload()
              }, 3000),
              setOpen(!open)
            )
          }
          className="border-0 rounded position-fixed bottom-50 start-0 z-1"
        />
      );
  };

  return (
    <Layout
      title="Les Categories"
      description="Toutes les categories"
      className="container-fluid"
    >
      <div className="row mt-3">
        <div className="col-md-3 mx-auto p-0">{sidebar()}</div>
        <div className="col-md-9 px-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-uppercase mb-0">
                Gestion Des Categories
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table no-wrap category-table mb-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium pl-4"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium"
                    >
                      Date Création
                    </th>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium"
                    >
                      Date Mise à Jour
                    </th>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium"
                    >
                      Slug
                    </th>
                    <th
                      scope="col"
                      className="border-0 text-uppercase font-medium"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((category, i) => (
                      <tr key={i} data-id={category._id}>
                        <td className="pl-4">{i + 1}</td>
                        <td>
                          <h5 className="font-small mb-0">{category.name}</h5>
                        </td>
                        <td>
                          <span className="badge bg-secondary">
                            {moment(category.createdAt).format("LLLL")}
                          </span>
                          <br />
                        </td>
                        <td>
                          <span className="badge bg-secondary">
                            {moment(category.updatedAt).format("DD/MM/YYYY")}
                          </span>
                          <br />
                        </td>
                        <td>
                          <span className="text-muted">{category.slug}</span>
                          <br />
                        </td>
                        <td className="accordion" id="accordionId">
                          <Actions
                            item={category}
                            showModal={(e, item) => {
                              item = category;
                              showModal(e, category);
                            }}
                            urlEdit={"/admin/categories/edit/"}
                            modalId={`key${i}`}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {categoryToModif && leModal()}
          </div>
        </div>
      </div>
    </Layout>
  );
}
