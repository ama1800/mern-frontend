import React from "react";

const ModalDelete = ({item, closeClick, deleteAction, open, className}) => {
  return (
    <dialog 
      open={open} 
      className={`${className} delete`}
      onBlur={() => closeClick()}
      >
            <div className="modal modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLabel">
                  Suppression du {item.name}?
                </h6>
                <button
                  type="button"
                  className="btn-close text-danger"
                  onClick={() => closeClick()}
                ></button>
              </div>
              <div className="modal-body">
                <p className="my-1">
                  Veuillez confirmer La suppression de {item.name}!
                </p>
              </div> 
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => closeClick()}
                  className="btn btn-outline-secondary me-2"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={(item) => deleteAction(item)}
                  className="btn btn-outline-danger"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </dialog>
  )
}
export default ModalDelete