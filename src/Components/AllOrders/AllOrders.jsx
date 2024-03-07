import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

export default function AllOrders() {
const [orders, setOrders]= useState([])
    
    
    async function getAllOrders(id){
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/`+id)
       setOrders(data)
    }
useEffect(() =>{
    
    const { id } = jwtDecode(localStorage.getItem('userToken'));
    console.log(id)
    getAllOrders(id)
}, [])

return <>
    {orders.map((order,index) =>
    <div key={index} className='row'>
        <div className='order shadow rounded p-4 my-5'>
            <div className="d-flex align-items-center">
                <h2 className='fw-bolder'>#{order.id}</h2>
                <h4>processing</h4>
            </div>
            <p>you have ordered {order.cartItems.lenght}items</p>
            <div className="d-flex">
                {order.cartItems.map((item,index) =>
            <img key={index} src={item.product.imageCover} style={{width : 150} } alt={item.product.title}/> )}
            </div>
<hr />
<p><strong>Total amount:
    </strong>{order.totalOrderPrice} EGP</p>
        </div>
    </div>
)}
</>
}
