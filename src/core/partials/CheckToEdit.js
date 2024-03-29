import React from 'react'

function CheckToEdit({ onCheck, product}) {
  return (
    <div className='mt-3'>
        <div className="form-check form-switch position-absolute top-0 end-0 me-1 py-1">
              <label className="form-check-label" htmlFor="checkToEdit"></label>
              <input
                onChange={(e, product) => onCheck(e, product)}
                data-item='edit'
                type="checkbox"
                className="form-check-input"
                id="checkToEdit"
              />
            </div>
    </div>
  )
}

export default CheckToEdit