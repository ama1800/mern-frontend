import { Outlet, Navigate } from 'react-router-dom'
import isAuth from './AuthService'

const privateRoutes = () => {
  return (
    isAuth() ? (<Outlet />) : <Navigate  to="/signin" />
  )
  }
export default privateRoutes
