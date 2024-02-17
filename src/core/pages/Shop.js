import React, { useEffect, useState } from "react";
import Layout from "../partials/Layout";
import { categoriesList, filterProducts, deleteItem } from "../api/apiCore";
import FilterByCategory from "../filters/FilterByCategory";
import FilterByPrice from "../filters/FilterByPrice";
import ProductCard from "../product/Card";
import { useNavigate } from "react-router-dom";
import isAuth from "../../auth/AuthService";
import ModalDelete from "../partials/ModalDelete";

const Shop = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [productsFiltred, setProductsFiltred] = useState([]);
  // eslint-disable-next-line no-use-before-define
  const [limit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);

  const [productToModif, setProductToModif] = useState({});
  const [openDelete, setOpenDelete] = useState(false);

  const [userFilters, setUserFilters] = useState({
    category: [],
    price: [],
  });

  useEffect(() => {
    categoriesList().then((res) => setCategories(res));
  }, []);

  useEffect(() => {
    filterProducts(skip, limit, userFilters).then((res) => {
      setProductsFiltred(res);
      setSkip(0);
      setSize(() => (res ? res.length : 0));
    });
  }, [userFilters]);

  const handleFilters = (data, filterBy) => {
    setUserFilters({ ...userFilters, [filterBy]: data });
  };

  const loadMore = () => {
    const toSkip = skip + limit;
    filterProducts(toSkip, limit, userFilters).then((res) => {
      setProductsFiltred([...productsFiltred, ...res]);
      setSize(res.length);
      setSkip(toSkip);
    });
  };

  const handleClick = (e, product) => {
    setProductToModif(product);
    if (e.target.getAttribute("data-item") === "delete") setOpenDelete(true);
  };

  // Le modal ainsi que les differentes methods ainsi que l'inversement du flux de données
  const leModal = () => {
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

  const buttonToLoadMore = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="text-center">
          <button onClick={loadMore} className="btn btn-success bg-gradient">
            Plus de produits
          </button>
        </div>
      )
    );
  };

  return (
    <div>
      <Layout
        title="La Boutique"
        description="Une Gamme De Produits Pour Vous."
        className="container-fluid"
      >
        <div className="row mt-3">
          <div className="col-md-3 accordion" id="accordionId">
            <FilterByCategory
              categories={categories}
              handleFilters={(data) => handleFilters(data, "category")}
            />
            <FilterByPrice
              handleFilters={(data) => handleFilters(data, "price")}
            />
          </div>
          <div className="col-md-9">
            <div
              className="row mt-2 mb-3 mx-auto"
              style={{ maxWidth: "1200px" }}
            >
              {productsFiltred &&
                productsFiltred.map((product, i) => (
                  <div
                    key={i}
                    data-id={product._id}
                    className="col-sm-6 col-lg-4 col-xl-3"
                  >
                    <ProductCard
                      product={product}
                      onShowModal={(e, item) => {
                        item = product;
                        handleClick(e, product);
                      }}
                    />
                  </div>
                ))}
            </div>
            {buttonToLoadMore()}
            {productToModif && leModal()}
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Shop;
