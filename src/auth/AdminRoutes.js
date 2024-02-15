import { Outlet, Navigate } from 'react-router-dom'
import isAuth from './AuthService'

const privateRoutes = () => {
  return (
    (isAuth() && isAuth().user.role === 1) ? (<Outlet />) : <Navigate  to="/404" />
  )
  }
export default privateRoutes