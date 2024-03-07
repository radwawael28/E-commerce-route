import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../Context/WishListContext'
import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext'

export default function WishList() {
  let {getWishList ,deleteWishList} = useContext(WishListContext)
  let {addToCart} = useContext(CartContext);
  const [wishList , setWishList] = useState(null)
  const [loading ,setLoading] =useState(true)
  async function getItems(){
    let {data} = await getWishList()
    console.log(data)
    setWishList(data)
    setLoading(false)
  }
  async function deleteItem(id){
    setLoading(true)
    let {data} = await deleteWishList(id)
    console.log(data)
    getItems()
    setLoading(false)
  }
  async function postToCart(id){
    setLoading(true)
    let {data} = await addToCart(id);
    if(data.status =='success'){
        toast.success(data.message)
        deleteItem(id)
        setLoading(false)
    }
}
  useEffect(()=>{
    getItems()
  },
  [])

  return <>
<div className="bg-main-light p-2 mt-5">
<h1 className='text-center text-main m-4'>Your Wish List</h1>
    {loading? 
    <div className="loading">
<i className='fas fa-spinner fa-spin'></i>
</div>: <>
{wishList?.data.map((product, index) => 
<div key={index} className="row border-1 border-bottom p-2 m-0">
  <div key={product._id} className="col-md-1">
    <div className="img">
      <img src={product.imageCover} className='w-100' alt={product.title} />
    </div>
  </div>
  <div className="col-md-9">
    <div className="item">
      <h3 className='h5 fw-bold'>{product.title.split(' ').slice(0,3).join(' ')}</h3>
<p className='text-main fw-bold'> Price : {product.price} EGP</p>
    <button onClick={()=> deleteItem(product._id)} className='btn'><i className="fas fa-trash-can text-danger me-2">
      </i>Remove</button>
    </div>
  </div>
  <div className="col-md-2">
  <button onClick={() => postToCart(product.id)}  className=" btn btn-lg text-main border-success font-sm"> Add To Cart</button>

  </div>
</div>
)}
</>}
</div>
  </>
}
