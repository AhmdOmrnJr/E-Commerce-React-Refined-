import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { authContext } from '../../Contexts/AuthContext'

export default function Navbar() {

  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext)
  let navigate = useNavigate()
  function logout (){
    setIsUserLoggedIn(false)
    localStorage.removeItem("token")
    navigate("/Login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="Fresh_cart_logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="container collapse navbar-collapse" id="navbarSupportedContent">
            {isUserLoggedIn ?
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " to={'home'}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'products'}>Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'brands'}>Brands</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'categories'}>Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'cart'}><i className='fa-solid fa-cart-shopping'></i></Link>
                </li>
              </ul> : null}
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item d-flex align-items-center'>
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-youtube'></i>
                <i className='fab mx-2 fa-tiktok'></i>
              </li>

              {!isUserLoggedIn ? <>
                <li className="nav-item">
                  <Link className="nav-link" to={'Login'}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'Register'}>Register</Link>
                </li>
              </>
                :
                <li className="nav-item">
                  <span onClick={logout} className="nav-link cursor-pointer">Logout</span>
                </li>
              }


            </ul>


          </div>
        </div>
      </nav>
    </>
  )
}
