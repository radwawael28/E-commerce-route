import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  let {getCartItems, deleteCartItems , updateCartItems, deleteAllCartItems,numOfCartItems }= useContext(CartContext)
  const [cart , setCart] = useState(null)
  const [loading ,setLoading] =useState(true)

  async function getItems(){
    let {data} = await getCartItems()
    console.log(numOfCartItems)
    console.log(data)
    setCart(data)
    setLoading(false)
  }
  async function deleteItem(id){
    setLoading(true)
    let {data} = await deleteCartItems(id)
    console.log(data)
    setCart(data)
    setLoading(false)
  }
  async function updateCart(id, count){
    if(count < 1){
      let {data} = await deleteCartItems(id)
      setCart(data)
    }else{
      let {data} = await updateCartItems(id, count)
      setCart(data)
    }
  }
  async function deleteAllItems(){
    setLoading(true)
    let {data} = await deleteAllCartItems()
    setCart(null)
    setLoading(false)
  }
  useEffect(()=>{
    getItems()
  },
  [])
  
  return <>
  
<div className="bg-main-light p-2 mt-5">
<h2 className='text-center m-4'>Your Cart</h2>
    {loading? 
    <div className="loading">
<i className='fas fa-spinner fa-spin'></i>
</div>: cart?<>
<p className='text-main'> numOfCartItems : {cart.numOfCartItems}</p>
<p className='text-main'> totalCartPrice : {cart.data.totalCartPrice}</p>
{cart.data.products.map((product, index) =>
<div className="row border-1 border-bottom p-2 m-0">
  <div key={index} className="col-md-1">
    <div className="img">
      <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
    </div>
  </div>
  <div className="col-md-10">
    <div className="item">
      <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
<p className='text-main fw-bold'> Price : {product.price} EGP</p>
    <button onClick={()=> deleteItem(product.product.id)} className='btn'><i className="fas fa-trash-can text-danger me-2">
      </i>Remove</button>
    </div>
  </div>
  <div className="col-md-1">
    <div className="count">
      <button onClick={()=> updateCart(product.product.id , product.count +1)} className='btn brdr p-1'>+</button>
      <span className='mx-2'>{product.count}</span>
      <button onClick={()=> updateCart(product.product.id , product.count -1)} className='btn brdr p-1'>-</button>
    </div>
  </div>
</div>
)}
<div className="d-flex justify-content-center p-3">
<button onClick={deleteAllItems} className='btn bg-main text-white m-2'  > clear all cart</button>

<Link to={`/address/${cart.data._id}`} className='btn bg-main text-white m-2'> Check Out</Link>
</div>
</>: <h2 className='text-center'> Is Empty ...!</h2>
}
</div>
  </>
}
