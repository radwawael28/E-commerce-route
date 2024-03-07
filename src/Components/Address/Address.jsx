import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
export default function Address() {
    let{checkOutSession} = useContext(CartContext)
    let {cartId} = useParams()
    const [loading , setLoading] = useState(false)

    async function checkOut(values){
    let {data} = await checkOutSession(cartId , values)
    console.log(data)
    if (data.status ==='success'){
        window.location.href = data.session.url
    }
    }

    let formik = useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:'',
    },onSubmit: checkOut
    })
    return <>
    <div className="w-75 mx-auto py-4">
        <form onSubmit={formik.handleSubmit} >
        <label htmlFor="details">details : </label>
        <textarea  onChange={formik.handleChange} type="text" id='details' details='details' className='form-control mb-3' />

        <label htmlFor="phone">phone : </label>
        <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />

        <label htmlFor="name">city : </label>
        <input  onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3' />

   

        <button type='submit' className='btn bg-main text-light'>pay
        </button>
        </form>
        </div>
    </>
}

