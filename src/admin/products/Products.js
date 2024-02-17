import React, { useState, useEffect, Fragment, useRef, useMemo } from "react";
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
  useMemo(() => {
    getProducts({ page: (searchParams.get('page')??1) }).then((res) => {
      setProducts(res.products)
      setPages(res.count.pages);
    });
  }, [searchParams]);
  
  // Liste des categories
  const [categories, setCategories] = useState([]);
  useMemo(() => {
    categoriesList().then((res) => setCategories(res));
  }, []);
  
  // eslint-disable-next-line no-use-before-define
  const [formData] = useState(new FormData());
  const [productToModif, setProductToModif] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState("");
  
  const [actualCategoryId, setActualCategoryId] = useState("");
  const [actualShipping, setActualShipping] = useState("");
 
    // Pagination (active & current)
  useEffect(() => {
      setCurrentPage(parseInt(searchParams.get('page')) ?? 1)
      setIsActive('active')
  }, [searchParams])
  
  // Pagination
  const handlePaginate = (e) => {
    e.preventDefault();
    let href = e.target.attributes.href.nodeValue
    navigate(href)
  }

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
              setTimeout(() => {
                window.location.reload()
              }, 3000),
              setOpenDelete(!openDelete)
            )
          }
          className="border-0 rounded position-fixed bottom-50 start-0 z-2"
        />
      );
  };

  console.log('render..');
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
            for (let box of document.querySelectorAll("#checkToEdit"))
              box.checked = false;
          }}
          editAction={(e) => {
              e.preventDefault();
              editItem(
                "api/product/update/",
                isAuth().token,
                productToModif,
                setTimeout(() => {
                  window.location.reload()
                }, 3000),
                formData,
                document.querySelectorAll("#checkToEdit"),
                setOpenEdit(false)
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
  const handleCheck = (e, product) => {
    setProductToModif(product);
    if (e.target.getAttribute('data-item') === 'edit') {
    for (let box of document.querySelectorAll("#checkToEdit"))  box.checked = false;
      e.target.checked = true;
      setOpenEdit(true)
    if(product.category ) setActualCategoryId(product.category._id);
    setActualShipping(product.shipping);
    }
    if (e.target.getAttribute("data-item") === "delete") setOpenDelete(true);
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
                      onShowModal={(e, item) => {
                        item = product;
                        handleCheck(e, product);
                      }}
                    >
                      {user && user.role === 1 && (
                        <Fragment>
                          <CheckToEdit
                            onCheck={(e, item) => {
                              item = product;
                              handleCheck(e, product);
                            }}
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
