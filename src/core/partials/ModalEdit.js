import React from "react";

const ModalEdit = React.forwardRef(
  (
    {
      item,
      closeClick,
      editAction,
      open,
      className,
      handleCh,
      actualId,
      actualShip,
      cates,
    },
    ref
  ) => {
    return (
      <dialog open={open} className={className}>
        <div className="modal modal-content w-75 mx-auto py-5">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel">
              Modification du {item.name}?
            </h6>
            <button
              type="button"
              className="btn-close text-danger"
              onClick={() => closeClick()}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={(e) => editAction(e)} ref={ref}>
              <div className="form-group">
                <label htmlFor="photo" className="form-label">
                  Image Produit
                </label>
                <input
                  onChange={(e) => handleCh(e)}
                  type="file"
                  className="form-control"
                  id="photo"
                  name="photo"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="text text-muted form-label"
                ></label>
                <input
                  onChange={(e) => handleCh(e)}
                  id="name"
                  type="text"
                  className="form-control"
                  defaultValue={item.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description" className="form-label"></label>
                <textarea
                  onChange={(e) => handleCh(e)}
                  defaultValue={item.description}
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  Le Prix
                </label>
                <input
                  onChange={(e) => handleCh(e)}
                  defaultValue={item.price}
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity" className="form-label">
                  Quantitie
                </label>
                <input
                  onChange={(e) => handleCh(e)}
                  defaultValue={item.quantity}
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  Categorie
                </label>
                <select
                  value={actualId}
                  onChange={(e) => handleCh(e)}
                  name="category"
                  id="category"
                  className="form-select"
                >
                  <option className="text-muted">
                    Choisissez une categorie
                  </option>
                  {cates &&
                    cates.map((category, i) => (
                      <option key={i} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="shipping" className="form-label">
                  Shipping
                </label>
                <select
                  value={actualShip}
                  onChange={(e) => handleCh(e)}
                  name="shipping"
                  id="shipping"
                  className="form-select"
                >
                  <option className="text-muted">Livraison</option>
                  <option value="false">Non</option>
                  <option value="true">Oui</option>
                </select>
              </div>
              <div className="modal-footer">
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => closeClick()}
                    className="btn btn-outline-secondary me-2"
                  >
                    Annuler
                  </button>
                  <button className="btn btn-outline-danger">
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);
export default ModalEdit;
