import React from "react";

const DeleteProduct = ({item}, modal ) => {
  
  const showClick = () => {
    modal.current.showModal();
  }
    const closeClick = () => {
    modal.current.close();
  }
  
  return (
    <dialog ref={modal} className="border-0 shadow-lg rounded">
    <div className="modal-content my-3 px-5">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Suppression du {item.name}?</h5>
        <button type="button" className="btn-close text-danger" onClick={closeClick}></button>
      </div>
      <hr />
      <div className="modal-body">
        <p className="my-1">Veuillez confirmer La suppression de {item.name}!</p>
      </div>
      <hr />
        <div className="modal-footer">
          <button type="button" onClick={closeClick} className="btn btn-outline-secondary me-2">Annuler</button>
          <button type="button" onClick={deleteProduct} className="btn btn-outline-danger">Confirmer</button>
        </div>
    </div>
  </dialog>
  );
};
export default DeleteProduct;
