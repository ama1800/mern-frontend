import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  getProducts,
  categoriesList,
  deleteItem,
  editItem,
} from "../../core/api/apiCore";
import sidebar from "../layouts/sidebar";
import Layout from "../../core/partials/Layout";
import ProductCard from "../../core/product/Card";
import ModalDelete from "../../core/partials/ModalDelete";
import ModalEdit from "../../core/partials/ModalEdit";
import CheckToEdit from "../../core/partials/CheckToEdit";
import { useNavigate, useSearchParams } from "react-router-dom";
import isAuth from "../../auth/AuthService";
import Pagination from "../../core/partials/Pagination";

export default function Products() {
  
  const formRef = useRef();
  const { user } = isAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [pages, setPages] = useState(1);
 
  // Liste des produits
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts({page: searchParams.get('page')??1}).then((res) => {
      setProducts(res.products)
      setPages(res.count.pages);
    });
  }, [searchParams]);
  
  // Liste des categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    categoriesList().then((res) => setCategories(res));
  }, []);
  
  // eslint-disable-next-line no-use-before-define
  const [formData, setFormData] = useState(new FormData());
  const [idproductToModif, setIdproductToModif] = useState(null);
  const [productToModif, setproductToModif] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [quickEdition, setQuickEdition] = useState(false);
  const [form, setForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState("");
  
  const [actualCategoryId, setActualCategoryId] = useState("");
  const [actualShipping, setActualShipping] = useState("");
 
    // Pagination (active & current)
  useEffect(() => {
      setCurrentPage(parseInt(searchParams.get('page')) ?? 1)
      setIsActive('active')
  }, [currentPage, searchParams])
  
  // Pagination
  const handlePaginate = (e) => {
    e.preventDefault();
    let href = e.target.attributes.href.nodeValue
    navigate(href)
  }

  // Au click sur supprimer recherche du produit à supprimer ou à modifier et affichage du modal
  useEffect(() => {
    if (idproductToModif) {
      const productById = (product) => {
        return product._id === idproductToModif;
      };
      const prod = products.find(productById);
      setproductToModif(prod);
      if(prod.category ) setActualCategoryId(prod.category._id);
      setActualShipping(prod.shipping);
      // Ouvrir le modal correspondant
      quickEdition ? setOpenEdit(true) : setOpenDelete(true);
    }
    // reinitialisation de l'id apres son utilisation et de la checkbox
    setIdproductToModif(null);
    setQuickEdition(false);
    // Observe les changement de l'id
  }, [idproductToModif, quickEdition, products]);

  // Le modal delete ainsi que les differentes methods ainsi que l'inversement du flux de données
  const deleteModal = () => {
    if (openDelete)
      return (
        <ModalDelete
          width={400}
          item={productToModif}
          open={openDelete}
          closeClick={() => setOpenDelete(false)}
          deleteAction={() =>
            deleteItem(
              "api/product/remove/",
              isAuth().token,
              productToModif,
              navigate("/admin/products"),
              setOpenDelete(!openDelete)
            )
          }
          className="border-0 rounded position-fixed bottom-50 start-0 z-2"
        />
      );
  };

  // Le modal edit ainsi que les differentes methods ainsi que l'inversement du flux de données
  const editModal = () => {
    if (openEdit)
      return (
        <ModalEdit
          handleCh={handleChange}
          actualId={actualCategoryId}
          actualShip={actualShipping}
          cates={categories}
          item={productToModif}
          closeClick={() => {
            setOpenEdit(false);
            setQuickEdition(false);
            for (let box of document.querySelectorAll("#checkToEdit"))
              box.checked = false;
          }}
          editAction={(e) => {
              e.preventDefault();
              editItem(
                "api/product/update/",
                isAuth().token,
                productToModif,
                window.location.reload(),
                formData,
                document.querySelectorAll("#checkToEdit"),
                setOpenEdit(false),
                setQuickEdition(false)
              );
            }
          }
          open={openEdit}
          ref={formRef}
          className="border-0 rounded z-2 bg-transparent vw-100 vh-100 position-fixed top-0"
        />
      );
  };

  // Assign input value to user properties (input onChange)
  const handleChange = (e) => {
    if (e.target.id === "category") setActualCategoryId(e.target.value);
    if (e.target.id === "shipping") setActualShipping(e.target.value);

    let value = e.target.id === "photo" ? e.target.files[0] : e.target.value;

    formData.set(e.target.id, value);
  };

  // Checkboxs quick edit
  const handleCheck = (e) => {
    for (let box of document.querySelectorAll("#checkToEdit"))
      box.checked = false;
    e.target.checked = !quickEdition;
    setQuickEdition(!quickEdition);
    setIdproductToModif(e.target.getAttribute("data-iditemtoedit"));
  };

  // Initialisation of formData on form loaded
  useEffect(() => {
    if (openEdit && formRef.current) {
      setForm(formRef.current);
    }
    if (form) {
      Array.from(form.elements).forEach((el) => {
        if (el.id && el.value) formData.set(el.id, el.value);
      });
    }
  }, [openEdit, form, formData]);

  // Render..
  return (
    <Layout
      title="Les Products"
      description="Tous les products"
      className="container-fluid"
    >
      <div className="row mt-3 px-1">
        <div className="col-md-3 mx-auto p-0">{sidebar()}</div>
        <div className="col-md-9 px-1">
          <div className="card px-1">
            <div className="card-body mb-0">
              <h5 className="card-title text-uppercase mb-0">
                Gestion Des Produits
              </h5>
            </div>
            <div className="row" style={{ maxWidth: "1200px" }}>
              {products &&
                products.map((product, i) => (
                  <div
                    key={i}
                    data-id={product._id}
                    className="col-sm-6 col-md-6 col-lg-4 col-xl-3"
                  >
                    <ProductCard
                      product={product}
                      onShowModal={setIdproductToModif}
                    >
                      {user && user.role === 1 && (
                        <Fragment>
                          <CheckToEdit
                            onCheck={handleCheck}
                            idItem={product._id}
                          />
                        </Fragment>
                      )}
                    </ProductCard>
                  </div>
                ))}
            </div>
          </div>
          {products.length > 0 && (
            <Pagination pages={pages} currentPage={currentPage} active={isActive} changePage={handlePaginate} />
          )}
        </div>
        {productToModif && deleteModal()}
        {productToModif && editModal()}
      </div>
    </Layout>
  );
}
