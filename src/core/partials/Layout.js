import React from 'react'

 const Layout = ({ title, description, className, children}) => {
  return (
    <div className="jumbotron py-3 min-vh-100 mt-5">
      <div>
        <h1 className="display-4">{title}</h1>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}
export default Layout