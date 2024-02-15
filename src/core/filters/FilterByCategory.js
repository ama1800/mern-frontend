import React, { useState } from "react";

export default function FilterByCategory({ categories, handleFilters }) {
  const [checked] = useState(new Set());
  const handleCategory = (category) => {
    checked.has(category._id)
      ? checked.delete(category._id)
      : checked.add(category._id);
    handleFilters(Array.from(checked));
  };
  return (
    <div className="accordion-item">
      <h5 className="accordion-header" id="heading1">
        <button
          className="accordion-button collapsed display-6"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse1"
          aria-expanded="false"
          aria-controls="collapse1"
        >
          Filtre Par Categories
        </button>
      </h5>
      <div
        id="collapse1"
        className="accordion-collapse collapse"
        aria-labelledby="heading1"
        data-bs-parent="#accordionId"
      >
        <div className="accordion-body">
          <ul className="ps-2">
            {categories &&
              categories.map((category, i) => (
                <li key={i} className="list-unstyled my-3">
                  <input
                    type="checkbox"
                    value={category._id}
                    onClick={() => handleCategory(category)}
                    id={i}
                    className="form-check-input"
                  />
                  <label htmlFor={i} className="form-check-label ms-3">
                    {category.name}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
