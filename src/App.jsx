import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import AuthContextProvider from './Contexts/AuthContext';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import LoggedIn from './Components/LoggedIn/LoggedIn';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ForgotPasswords from './Components/ForgotPasswords/ForgotPasswords';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Products from './Components/Products/Products';



export default function App() {

const queryClient = new QueryClient()
const routers = createHashRouter ([
  {
    path: '', element: <Layout />, children: [
      { path: '', element: <Navigate to={'home'} /> },
      { path: 'register', element: <LoggedIn> <Register /> </LoggedIn> },
      { path: 'login', element: <LoggedIn> <Login /> </LoggedIn> },
      { path: 'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: 'productDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: 'forgotpassword', element: <LoggedIn> <ForgotPasswords /> </LoggedIn> },
      { path: 'resetPassword', element: <LoggedIn> <ResetPassword /> </LoggedIn> },
      { path: 'verifyresetcode', element: <LoggedIn> <VerifyResetCode /> </LoggedIn> },
      {
        path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute>, children: [
          { path: 'brands/:id', element: <ProtectedRoute> <BrandProducts /> </ProtectedRoute> },
        ]
      },
      {
        path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute>, children: [
          { path: 'categories/:id', element: <ProtectedRoute> <CategoryProducts /> </ProtectedRoute> },
        ]
      },
      { path: 'address/:cartId', element: <ProtectedRoute> <Address /> </ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute> <Orders /> </ProtectedRoute> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

  return <>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={routers}>
        </RouterProvider>
      </AuthContextProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </>
}
