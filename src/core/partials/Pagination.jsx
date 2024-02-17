import React from "react";
import { Link } from "react-router-dom";

function Pagination({ pages, currentPage, active, changePage }) {
  if (pages > 1) {
    return (
      <div className="mt-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {currentPage > 1 && (
              <li className="page-item">
                <Link onClick={(e) => changePage(e)} className="page-link" to={`?page=${currentPage - 1}`}>
                  Précédent
                </Link>
              </li>
            )}
            {(!currentPage || currentPage === 1) && (
              <li className="page-item">
                <Link className="page-link disabled-link" >
                  Précédent
                </Link>
              </li>
            )}

            {Array.from({ length: pages }, (i, page) => {
              if (page + 1 === currentPage) {
                return (
                  <li key={page} className={`page-item ${active}`}>
                    <Link className="page-link disabled-link">
                      {currentPage}
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li key={page} className="page-item">
                    <Link onClick={(e) => changePage(e)} className="page-link" to={`?page=${page + 1}`}>
                      {page + 1}
                    </Link>
                  </li>
                );
              }
            })}

            {(!currentPage || currentPage < pages) && (
              <li className="page-item">
                <Link onClick={(e) => changePage(e)} className="page-link" to={`?page=${currentPage ? currentPage + 1: 2}`}>
                  Suivant
                </Link>
              </li>
            )}
            {currentPage  >= pages && (
              <li className="page-item">
                <Link className="page-link disabled-link">
                  Suivant
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
