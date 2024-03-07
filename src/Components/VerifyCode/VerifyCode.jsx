import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {
    const [loading , setLoading] = useState(false)
    const [apiError , setApiError] = useState(null)
    let navigate = useNavigate()
    async function getCode(values){
        let {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
        .catch((err)=>{setApiError(err.response.data.message)
            setLoading(false)})
        console.log(data)


if (data.status === 'success'){
    toast.success(data.status)
}
    }
        
        let formik = useFormik({
            initialValues:{
            resetCode:'',
            },onSubmit: getCode
        })

return <>
<div className="w-75 mx-auto py-4">
<h2>please enter your verification code</h2>
<form onSubmit={formik.handleSubmit} >

    <label htmlFor="email">resetCode : </label>
    <input onChange={formik.handleChange} type="code" id='code' name='code'className='form-control mb-3' />
    {apiError ? <div className="alert alert-danger">{apiError}</div>:null}
    <button  type='submit' className='btn bg-main text-light'> verify </button>
    </form>
    </div>

</>
}