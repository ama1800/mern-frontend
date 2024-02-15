import React, { useEffect, useState } from "react";
import { categoriesList, getProducts } from "../api/apiCore";
import ProductCard from "./Card";

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchData, setsearchData] = useState({ search: "", category: "" });

  const handleChange = (e) => {
    setsearchData({ ...searchData, [e.target.id]: e.target.value });
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    let { search, category } = searchData;
    if (search || category) {
      getProducts({ search: search || undefined, category }).then((res) => {
        setProducts(res);
      });
    } else setProducts([])
  };

  const searchResult = () => {
    return products && products.length > 0 && (
      <div className="mb-3">
      <hr/>
      <h4>Resultat de la Recherche: {products.length} produits(s) trouvé.</h4>
      </div>
    )
  }

  useEffect(() => {
    categoriesList().then((res) => setCategories(res));
  }, []);

  return (
    <div className="my-5 px-5">
      <form onSubmit={searchSubmit}>
        <div className="input-group input-group-lg position-relative">
          <div className="input-group-prepend">
            <select
              onChange={handleChange}
              id="category"
              className="btn btn-outline-dark rounded-pill me-2"
            >
              <option value="">Choisir Categorie</option>
              {categories &&
                categories.map((category, i) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <input
            onChange={handleChange}
            placeholder="Recherche"
            id="search"
            type="search"
            className="form-control rounded-pill p-0 pb-2 px-2 border border-primary"
          />
          <div style={{zIndex: 5}} className="input-group-apprend position-absolute end-0">
            <button className="btn btn-primary py-2 rounded-circle border-0">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      {searchResult()}
      <div className="row">
        {products &&
          products.map((product, i) => (
            <div
              key={i}
              data-id={product._id}
              className="col-sm-6 col-md-4 col-lg-3 mx-auto"
            >
              <ProductCard product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default Search;
