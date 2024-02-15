import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// Authentification
import Signin from './user/Signin'
import Signup from './user/Signup'
// partials
import Menu from './core/partials/Menu'
// Pages
import Home from './core/pages/Home'
import Page404 from './core/pages/404'
import Shop from './core/pages/Shop'
// Produit
import ShowProduct from './core/product/ShowProduct'
// Profiles
import Dashboard from './user/Dashboard'
import AdminDashboard from './admin/AdminDashboard'
// Administration
import Users from './admin/users/Users'
import Categories from './admin/categories/Categories'
import Products from './admin/products/Products'
import CreateCategory from './admin/categories/AddCategory'
import CreateProduct from './admin/products/AddProduct'
import EditProduct from './admin/products/EditProduct'
import Commandes from './admin/commandes/Commandes'
// Les routes
import PrivateRoutes from './auth/PrivateRoutes'
import AdminRoutes from './auth/AdminRoutes'
import EditCategory from './admin/categories/EditCategory'
// Panier
import Cart from './core/pages/Cart'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/signin' exact element={<Signin/>} />
        <Route path='/signup' exact element={<Signup/>} />
        <Route path='/' exact element={<Home/>} />
        <Route path='/cart' exact element={<Cart/>} />
        <Route path='/Shop' exact element={<Shop/>} />
        <Route path="*" exact element={<Page404/>} />
        <Route path="/product/:id" exact element={<ShowProduct/>} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" exact element={<Dashboard/>} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin/dashboard" exact element={<AdminDashboard/>} />
          <Route path="/admin/users" exact element={<Users/>} />
          <Route path="/admin/commandes" exact element={<Commandes/>} />
          <Route path="/admin/categories" exact element={<Categories/>} />
          <Route path="/admin/products" exact element={<Products/>} />
          <Route path="/admin/categories/addCategory" exact element={<CreateCategory/>} />
          <Route path="/admin/categories/edit/:id" exact element={<EditCategory/>} />
          <Route path="/admin/products/addProduct" exact element={<CreateProduct/>} />
          <Route path="/admin/products/edit/:id" exact element={<EditProduct/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes

/* 
import { BrowserRouter, Switch, Route } from 'react-router-dom'
<Switch>
<Route path='/signin' exact component={Signin}/>
<Route path='/signup' exact component={Signup}/>
<Route path='/' exact component={Home}/>
</Switch> */