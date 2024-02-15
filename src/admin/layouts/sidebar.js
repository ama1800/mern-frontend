import { Link, useLocation } from "react-router-dom";
export default function Sidebar() {

  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return "active";
    }
    else if(location.pathname.includes(path)){
      return {collapsed: "", show: "show"};
    } else {
      return {collapsed: "collapsed", show: ""};
    }
  };

  return (
    <div className="card mx-1 h-100">
      <div className="card-body px-1">
        <h5 className="card-title">Tableau De Bord</h5>
        <ul className="list-group list-group-flush p-1 accordion" id="accordionId">
        <li className="list-group-item p-0 mb-1 accordion-item">
            <h5 className="accordion-header" id="headingOne">
              <button
                className={`accordion-button ${isActive('categories').collapsed}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Categories
              </button>
            </h5>
            <div
              id="collapseOne"
              className={`accordion-collapse collapse ${isActive('categories').show}`}
              aria-labelledby="headingOne"
              data-bs-parent="#accordionId"
            >
              <div className="accordion-body">
                <ul className="list-group list-group-flush">
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/categories"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/categories">
                      Toutes Categories
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/categories/AddCategory"
                    )}`}
                  >
                    <Link
                      className="nav-link"
                      to="/admin/categories/AddCategory"
                    >
                      Créer Categorie
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/categories/actives"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/categories/actives">
                      Categories Actives
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/categories/disabled"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/categories/disabled">
                      Categories Désactiver
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="list-group-item p-0 mb-1 accordion-item">
            <h5 className="accordion-header" id="heading4">
              <button
                className={`accordion-button ${isActive('categories').collapsed}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
              >
                Commandes
              </button>
            </h5>
            <div
              id="collapse4"
              className={`accordion-collapse collapse ${isActive('categories').show}`}
              aria-labelledby="heading4"
              data-bs-parent="#accordionId"
            >
              <div className="accordion-body">
                <ul className="list-group list-group-flush">
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/commandes"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/commandes">
                      Toutes Commandes
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="list-group-item p-0 mb-1 accordion-item">
            <h5 className="accordion-header" id="headingTwo">
              <button
                className={`accordion-button ${isActive('products').collapsed}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Produits
              </button>
            </h5>
            <div
              id="collapseTwo"
              className={`accordion-collapse collapse ${isActive('products').show}`}
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionId"
            >
              <div className="accordion-body">
                <ul className="list-group list-group-flush">
                  <li
                    className={`list-group-item ${isActive("/admin/products")}`}
                  >
                    <Link className="nav-link" to="/admin/products">
                      Tous Produits
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/products/addProduct"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/products/addProduct">
                      Créer Produit
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/products/actives"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/products/actives">
                      Produits Actives
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/products/disabled"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/products/disabled">
                      Produits Désactiver
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li className="list-group-item p-0 mb-1 accordion-item">
            <h5 className="accordion-header" id="headingTwo">
              <button
                className={`accordion-button ${isActive('users').collapsed}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Utilisateurs
              </button>
            </h5>
            <div
              id="collapseThree"
              className={`accordion-collapse collapse ${isActive('users').show}`}
              aria-labelledby="headingThree"
              data-bs-parent="#accordionId"
            >
              <div className="accordion-body">
                <ul className="list-group list-group-flush">
                  <li className={`list-group-item ${isActive("/admin/users")}`}>
                    <Link className="nav-link" to="/admin/users">
                      Tous Utilisateurs
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/users/create"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/users/create">
                      Créer Utilisateur
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/users/actives"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/users/actives">
                      Utilisateurs Actives
                    </Link>
                  </li>
                  <li
                    className={`list-group-item ${isActive(
                      "/admin/users/disabled"
                    )}`}
                  >
                    <Link className="nav-link" to="/admin/users/disabled">
                      Utilisateurs Désactiver
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
