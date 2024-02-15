import React from "react";
import { Link, useLocation } from "react-router-dom";

const Actions = ({item, showModal, urlEdit, modalId}) => {

    const isActive = (e) => {
        let btns = document.querySelectorAll('.accordion-button')
        for(const btn of btns){
            if (btn !== e.target) {
            btn.classList.add('collapsed')
            btn.parentNode.nextSibling.classList.remove("show")
            }
        }
    };

  return (
    <div className="accordion-item" style={{ border: 'unset', width: '50px'}}>
      <h5 className="accordion-header" id={`heading${modalId}`}>
        <button
          className="accordion-button collapsed p-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${modalId}`}
          onClick={(e) => isActive(e)}
          aria-expanded="false"
          aria-controls={`collapse${modalId}`}
        >
        </button>
      </h5>
      <div
        id={`collapse${modalId}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${modalId}`}
        data-bs-parent="#accordionId"
      >
        <div className="p-0 accordion-body">
          <ul className="p-0 m-0">
            <li className="list-unstyled my-1 pt-2">
              <button
                type="button"
                className="btn btn-outline-info btn-circle btn-ms w-100"
                onClick={(e) => showModal(e)}
                data-itemtoshow={item._id}
              >
                <i className="fa fa-eye"></i>{" "}
              </button>
            </li>
            <li className="list-unstyled my-1">
              <button
                type="button"
                className="btn btn-outline-info btn-circle btn-ms w-100"
                onClick={(e) => showModal(e)}
                data-itemtodelete={item._id}
              >
                <i className="fa fa-trash"></i>{" "}
              </button>
            </li>
            <li className="list-unstyled my-1">
              <Link to={`${urlEdit}${item._id}`}>
                <button
                  type="button"
                  className="btn btn-outline-info btn-circle btn-ms w-100"
                >
                  <i className="fa fa-edit"></i>{""}
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Actions;
