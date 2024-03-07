import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const [details, setDetails]= useState({})
const [loading, setLoading]= useState(true)
let {addToCart} = useContext(CartContext);
let {addToWishList} = useContext(WishListContext)
  let {id} = useParams()
  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:200,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  async function postToWishList(id){
    let {data} = await addToWishList(id);
    if(data.status =='success'){
        toast.success(data.message)
        
    }
}
async function postToCart(id){
    let {data} = await addToCart(id);
    if(data.status =='success'){
        toast.success(data.message)
    }
}
  async function getProductDetails(){
    
    let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setLoading(false)
  }
useEffect(()=>{
  getProductDetails(id)
},[])

  return <>
  {loading ?
<div className=" row justify-content-center align-items-center vh-100">
<button type='button' className='btn bg-main text-light'>
<i className='fas fa-spinner fa-spin'></i>
</button>
</div>
: <div className="row align-items-center">
  <div className="col-md-4">
  <Slider {...settings} >
      {details.images.map(image => <img src= {image} key={details.id} alt={details.title} className='w-100'></img>)}
    </Slider>
  
  </div>
  <div className="col-md-8">
    <div className="details">
            <h3 className='h5'>{details.title}</h3>
            <p className='py-3'>{details.description}</p>
            <span className=' text-main font-sm'>{details.category.name} </span>
            <div className="d-flex py-3 justify-content-between align-items-center">
              
                <span className='font-sm'>
                    {details.price} EGP
                </span>
                <span className='font-sm'>
                    <i className='fas fa-star rating-color me-1'></i>
                    {details.ratingAverage} EGP
                </span>
                </div> 
                <div className='d-flex align-items-center justify-content-center'>
                <button onClick={() => postToCart(details.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add To Cart</button>  
                <i onClick={() => postToWishList(details.id)}  className="fa-solid fa-heart h3 ms-2" id='heart' ></i> 
                </div>     
            
    </div>
  </div>
</div>
  }
  </>

}
