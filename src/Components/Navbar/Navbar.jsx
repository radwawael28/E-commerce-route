import React, { useContext, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';

export default function Navbar() {
  let {userToken , setUserToken} = useContext(UserContext)
  let {numOfCartItems} = useContext(CartContext)
  let navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {userToken != null ? <>
              <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">Wish List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allorders">Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">Cart</Link>
              <span class="position-absolute badge translate-middle badge rounded-pill bg-danger">
                {numOfCartItems ?? ' '}
                </span>
            </li>
          

            </> : '' }
        
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            {userToken != null ?
            <li className="nav-item">
              <Link onClick={logOut} className="nav-link" >Logout</Link>
            </li> :  <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            </> }
          </ul>

        </div>
      </div>
    </nav>
  </>
}
