import React from "react";

export default function FilterByPrice({ handleFilters }) {
  const prices = [
    {
      _id: 1,
      name: "Tous",
      value: [0, 999999],
    },
    {
      _id: 2,
      name: "0€ à 29€",
      value: [0, 29],
    },
    {
      _id: 3,
      name: "30€ à 79€",
      value: [30, 79],
    },
    {
      _id: 4,
      name: "80€ à 119€",
      value: [80, 119],
    },
    {
      _id: 5,
      name: "120€ à 199€",
      value: [120, 199],
    },
    {
      _id: 6,
      name: "Plus de 200€",
      value: [200, 999999],
    },
  ];

  const handlePrice = (e) => {
    handleFilters(prices[e.target.value]["value"]);
  };

  return (
    <div className="accordion-item">
      <h5 className="mt-2 accordion-header" id="heading2">
        <button
          className="accordion-button collapsed display-6"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapse2"
          aria-expanded="false"
          aria-controls="collapse2"
        >
          Filtre Par Prix
        </button>
      </h5>
      <div
        id="collapse2"
        className="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionId"
      >
        <div className="accordion-body">
          {prices.map((price, i) => (
            <div key={i} className="my-2">
              <label htmlFor={`${i}-${price.name}`}>
                <input
                  value={i}
                  onChange={handlePrice}
                  className="mx-3"
                  type="radio"
                  name="price"
                  id={`${i}-${price.name}`}
                />
                {price.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
