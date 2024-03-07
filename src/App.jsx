import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import CounterContextProvider from './Components/Context/CounterContext';
import { UserContext } from './Components/Context/UserContext';
import { useContext, useEffect } from 'react';
import ProdectedRoute from './Components/ProdectedRoute/ProdectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import WishList from './Components/WishList/WishList';
import Address from './Components/Address/Address';
import SubCategories from './Components/SubCategories/SubCategories';
import  { Toaster } from 'react-hot-toast';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';

export default  function App(){
  let routes = createBrowserRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element: <ProdectedRoute> <Home/></ProdectedRoute>},
      {path:'Products' , element: <ProdectedRoute>  <Products/></ProdectedRoute>},
      {path:'Productdetails/:id' , element: <ProdectedRoute>  <ProductDetails/></ProdectedRoute>},
      {path:'Cart' , element: <ProdectedRoute> <Cart/></ProdectedRoute> },
      {path:'Address/:cartId' , element: <ProdectedRoute> <Address/></ProdectedRoute> },
      {path:'wishlist' , element: <ProdectedRoute> <WishList/></ProdectedRoute> },
      {path:'AllOrders' , element: <ProdectedRoute> <AllOrders/></ProdectedRoute> },
      {path:'Categories' , element: <ProdectedRoute> <Categories/> </ProdectedRoute>},
      {path:'Categories/:id/Subcategories' , element: <ProdectedRoute> <SubCategories/> </ProdectedRoute>},
      {path:'Brands' , element: <ProdectedRoute> <Brands/> </ProdectedRoute>},
      {path:'Login' , element:<Login/>},
      {path:'Register' , element:<Register/>},
      {path:'Verifycode' , element:<VerifyCode/>},
      {path:'Forgotpassword' , element:<ForgotPassword/>},
    ] }
  ])

  let {setUserToken} = useContext(UserContext);
  useEffect(()=>{if (localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
  }} , [])
  
  return <>

    <CounterContextProvider>
<Toaster/>
    <RouterProvider router={routes}></RouterProvider>
    
    </CounterContextProvider>
  
  
    </>

}


