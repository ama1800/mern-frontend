/**
 * Liste des requêtes pour interagir avec le backend
 */
import { API_URL } from "../../config";
import toastr from "toastr";
import "toastr/build/toastr.css";
import queryString from "query-string";
import isAuth from "../../auth/AuthService";

// list produits
export const getProducts = (params) => {
  let query = queryString.stringify(params);
  return fetch(`${API_URL}api/product?${query}`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      let result = {
        products: res.products,
        count: res.count,
      };
      return result;
    })
    .catch((err) => console.error(err));
};

// list des categories
export const categoriesList = () => {
  return fetch(`${API_URL}api/category`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result.categories)
    .catch((err) => console.error(err));
};

// Filtre des produits
export const filterProducts = (skip, limit, filters) => {
  const data = { filters };

  return fetch(`${API_URL}api/product/search?limit=${limit}&skip=${skip}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(data, limit, skip),
  })
    .then((res) => res.json())
    .then((result) => result.products)
    .catch((err) => console.error(err));
};

// Get single product by id
export const getOneProduct = (id) => {
  return fetch(`${API_URL}api/product/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result.product)
    .catch((err) => console.error(err));
};

// Get single Category by id
export const getOneCategory = (id) => {
  return fetch(`${API_URL}api/category/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => result.category)
    .catch((err) => console.error(err));
};

// Suppression d'un element (categorie, produit, utilistaeur,...)
export const deleteItem = (url, token, item = {}, nav) => {
  fetch(`${API_URL}${url}${item._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: item,
  })
    .then(async (res) => {
      if (res.status === 204) {
        toastr.info(`${item.name} à été supprimer.`, "", {
          positionClass: "toast-top-center",
        });
        nav = () => {};
      } else await res.json();
      if (res.error) {
        toastr.error(res.error, "Erreur,", {
          positionClass: "toast-top-center",
        });
      }
    })
    .catch((err) => console.error(err));
};

// liste des produits en relation avec un produit
export const relatedProducts = (id) => {
  return fetch(`${API_URL}api/product/related/${id}`)
    .then((res) => res.json())
    .then((res) => res.products)
    .catch((err) => console.error(err));
};

// Modification d'un element (categorie, produit, utilistaeur,...)
export const editItem = (url, token, item = {}, nav, itemData, boxes) => {

  fetch(`${API_URL}${url}${item._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: itemData,
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error || result.errors) {
        let err = result.error ? result.error : result.errors.name.message;
        toastr.error(err, "Erreur,", { positionClass: "toast-top-center" });
      } else {
        toastr.success(`${item.name} à été modifier.`, "", {
          positionClass: "toast-top-center",
        });
        itemData.forEach((val, key) => itemData.delete(key));
        nav = () => {};
        if (boxes) for (let box of boxes) box.checked = false;
        if (result._id === isAuth().user._id) {
          localStorage.setItem('jwt_info', JSON.stringify({token: isAuth().token, user: result}))
        }
      }
    })
    .catch((err) => {
      toastr.error(err, "Erreur serveur!", {
        positionClass: "toast-top-center",
      });
    });
    
};

// Sollicitation du jeton du payement via Braintree
export const getBraintreeToken = (userId, token) => {
  return fetch(`${API_URL}api/braintree/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

// Procedure du payement via Braintree
export const payementProcess = (userId, token, paymentData) => {
  return fetch(`${API_URL}api/braintree/pusrchase/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  }).then((res) => res.json());
};

// Creation de la commande (+ history des achats, compte des vendu & decrementation de la quantity)
export const createOrder = (userId, token, dataOrder) => {

  return fetch(`${API_URL}api/order/create_order/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataOrder),
  }).then((res) => res.json());
  
}

// Liste des commandes
export const getOrders = (token, id) => {
  return fetch(`${API_URL}api/order/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

// Liste des commandes d'un utilisateur
export const getUserOrders = (token, id) => {
  return fetch(`${API_URL}api/order/userorders/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

// Liste des status possible d'une commande
export const getStatus = (token, id) => {
  return fetch(`${API_URL}api/order/status/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

// Changement de status d'une commandes
export const changeOrderStatus = (token, idOrder, params) => {
  let query = queryString.stringify(params);
  return fetch(`${API_URL}api/order/uporder/${idOrder}?${query}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

// Changer le role de l'utilisateur
export const upUserRole = (token, id, role) => {
  return fetch(`${API_URL}api/user/profile/role/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({role}),
  })
    .then((res) => res.json());
}