import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [loading , setLoading] = useState(false)
    const [apiError , setApiError] = useState(null)
    let navigate = useNavigate()
    async function verifyPassword(values){
        let {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
        .catch((err)=>{setApiError(err.response.data.message)
            setLoading(false)})
            console.log(data)
            if (data.statusMsg === 'success'){
                toast.success(data.message)
                navigate('/verifycode');
}
    }

    let validationSchema = Yup.object({
        email : Yup.string().required('email is requird').email('invalide email') })
        
        let formik = useFormik({
            initialValues:{
            email:"",
            },validationSchema,
            onSubmit:verifyPassword
        })

return <>
<div className="w-75 mx-auto py-4">
<h2>please enter your email</h2>
<form onSubmit={formik.handleSubmit} >

    <label htmlFor="email">Email : </label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email'className='form-control mb-3' />
    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-3" >{formik.errors.email}</div>:null}
    <button  type='submit'  className='btn bg-main text-light'> verify </button>
    </form>
    </div>

</>
}