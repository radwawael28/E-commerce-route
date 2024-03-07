import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
export default function Register() {
  const [loading , setLoading] = useState(false)
  const [apiError , setApiError] = useState(null)
  
  let navigate = useNavigate()
  async function registerSubmit(values){
    setLoading(true)
  let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
    .catch((err) => {
      setApiError(err.response.data.message)
    setLoading(false)
  })
  if (data.message === 'success'){
      setLoading(false)
      navigate('/login')
    }
  }
let validationSchema = Yup.object({
  name : Yup.string().required('name is requird').min(3,'min is 3').max(10,' max is 10'),
  email : Yup.string().required('email is requird').email('invalide email'),
  password : Yup.string().required('password is requird').matches(/^[A-Z][\w @]{5,8}$/ ,'invalid password ex (Ahmed123)'),
  rePassword : Yup.string().required('rePassword is requird').oneOf([Yup.ref('password')], 'password and rePassword do not match'),
  phone :Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/ , 'we need egyption number')
})
/*function validate(values){
  let errors ={}
  if (!values.name){
    errors.name ='Name is required'
  }else if (values.name.length < 3){
    errors.name ='min length is 3'
  }else if (values.name.length > 10){
    errors.name ='max length is 10'
}
if (!values.email){
  errors.email ='email is required'
}else if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))){
  errors.email ='email invalid'
}
if (!values.password){
  errors.password ='password is required'
}else if (!(/^[A-Z][\w @]{5,8}$/.test(values.password))){
  errors.password ='password invalid'
}
if (!values.rePassword){
  errors.rePassword ='rePassword is required'
}else if (!(values.password === values.rePassword)){
  errors.rePassword ='password not match'
}
  if (!values.phone){
    errors.phone ='phone is required'
  }else if (!(/^01[0125][0-9]{8}$/.test(values.phone))){
    errors.phone ='we need egyption number'
  }

return errors
}*/
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },validationSchema,
    onSubmit:registerSubmit
  })
  return <>
    <div className="w-75 mx-auto py-4">
      <h2>Register Now</h2>
      <form onSubmit={formik.handleSubmit} >
        {apiError ? <div className="alert alert-danger">{apiError}</div>:null}
        <label htmlFor="name">Name : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name'className='form-control mb-3' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-3" >{formik.errors.name}</div>:null}
        <label htmlFor="email">Email : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email'className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-3" >{formik.errors.email}</div>:null}
        <label htmlFor="password">password : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password'className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-3" >{formik.errors.password}</div>:null}
        <label htmlFor="rePassword">rePassword : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword'className='form-control mb-3' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-3" >{formik.errors.rePassword}</div>:null}
        <label htmlFor="phone">phone : </label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone'className='form-control mb-3' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-3" >{formik.errors.phone}</div>:null}
        {loading?<button type='button' className='btn bg-main text-light'>
  <i className='fas fa-spinner fa-spin'></i>
  </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register
      </button>}
      
      <Link className='ps-3' to={'/login'}>Login Now</Link>
        
      
      </form>
    </div>
  </>
}
