import React, { useState, useEffect } from "react";
import Layout from "../partials/Layout";
import { getProducts, deleteItem } from "../api/apiCore";
import ProductCard from "../product/Card";
import Search from "../product/Search";
import isAuth from "../../auth/AuthService";
import ModalDelete from "../partials/ModalDelete";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [productsBestSellers, setProductsBestSellers] = useState([]);
  const [productsNewArrivals, setProductsNewArrivals] = useState([]);
  const [products, setProducts] = useState([]);

  const loadBestSellers = () => {
    getProducts({ sortBy: "sold", product: "desc", limit: 6 }).then((res) =>
      setProductsBestSellers(res.products)
    );
  };

  const loadNewArrivals = () => {
    getProducts({ sortBy: "createdAt", product: "desc", limit: 3 }).then(
      (res) => setProductsNewArrivals(res.products)
    );
  };

  useEffect(() => {
    loadNewArrivals();
    loadBestSellers();
    getProducts().then(products => setProducts(products));
  }, []);

  const [productToModif, setProductToModif] = useState({});
  const [openDelete, setOpenDelete] = useState(false);

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
          className="bproduct-0 rounded position-fixed bottom-50 start-0 z-2"
        />
      );
  };

  return (
    <div>
      <Layout
        title="Page D'Accueil"
        description="Node React Ecommerce"
        className="container-fluid"
      >
        <hr />
        <Search />
        <hr />
        <div className="row my-2 mb-3 mx-auto" style={{ maxWidth: "900px" }}>
          <h2>Nouveaux Produits</h2>
          {productsNewArrivals &&
            productsNewArrivals.map((product, i) => (
              <div
                key={i}
                data-id={product._id}
                className="col-sm-6 col-md-4 mx-auto"
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
        <hr />
        <div className="row my-2 mb-3 mx-auto" style={{ maxWidth: "1200px" }}>
          <h2>Milleurs Ventes</h2>
          {productsBestSellers &&
            productsBestSellers.map((product, i) => (
              <div
                key={i}
                data-id={product._id}
                className="col-sm-6 col-md-4 col-lg-3"
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
        {productToModif && leModal()}
      </Layout>
    </div>
  );
}
