import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import { WishListContext } from '../Context/WishListContext'
import toast from 'react-hot-toast';
import Style  from './FeaturedProducts.module.css'
export default function FeaturedProducts() {

function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
}

let {data, isLoading } =useQuery('featuredProducts', getProducts)
let {addToCart} = useContext(CartContext);
let {addToWishList} = useContext(WishListContext)
const [search, setSearch] = useState('')
const [searchlist, setSearchList] = useState([])

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

return <>
<input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="search...." className="w-75 mx-auto form-control my-5 ng-pristine ng-valid ng-touched">
</input>
{isLoading ?
<div className="loading">
<i className='fas fa-spinner fa-spin f'></i>
</div>
: 
<div className="row gy-4">

{data?.data.data.map(product => 
    <div className="col-lg-3 ">
        <div className="product p-2">
        <Link to={`/productdetails/${product.id}`}> 
            <img src={product.imageCover } className='w-100' alt={product.title} />
            <span className='font-sm text-main'>{product.category.name}</span>
            <h3 className='h5'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
            <div className="d-flex py-3 justify-content-between align-items-center">
                <span className='font-sm'>
                    {product.price} EGP
                </span>
                <span className='font-sm'>
                    <i className='fas fa-star rating-color me-1'></i>
                    {product.ratingAverage} EGP
                </span>
                </div> 
                </Link>
                <div className='d-flex align-items-center justify-content-center'>
                <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add To Cart</button>  
                <i onClick={() => postToWishList(product.id)} 
            className="fa-solid fa-heart h3 ms-2 red" id={`heart`} ></i> 
                </div>
            </div>
    </div>)}
</div>}
</>
}
