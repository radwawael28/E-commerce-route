import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
export default function Login(){
    const [loading , setLoading] = useState(false)
    const [apiError , setApiError] = useState(null)
    let navigate = useNavigate()
    let {setUserToken} = useContext(UserContext)
    
    async function loginSubmit(values){
      setLoading(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      .catch((err)=>{setApiError(err.response.data.message)
      setLoading(false)})


    if (data.message === 'success'){
        setLoading(false)
        localStorage.setItem('userToken' , data.token)
        setUserToken(data.token)
        navigate('/')
      }
    }
  /*let validationSchema = Yup.object({
    email : Yup.string().required('email is requird').email('invalide email'),
    password : Yup.string().required('password is requird').matches(/^[A-Z][\w @]{5,8}$/ ,'invalid password ex (Ahmed123)'),
    })*/
    function validate(values){
      let errors ={}
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
      return errors
}
    let formik = useFormik({
      initialValues:{
        email:"",
        password:"",
      },validate,
      onSubmit:loginSubmit
    })
    return <>
      <div className="w-75 mx-auto py-4">
        <h2>login Now</h2>
        <form onSubmit={formik.handleSubmit} >
          {apiError ? <div className="alert alert-danger">{apiError}</div>:null}
          
          <label htmlFor="email">Email : </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email'className='form-control mb-3' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-3" >{formik.errors.email}</div>:null}
          
          <label htmlFor="password">password : </label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password'className='form-control mb-3' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-3" >{formik.errors.password}</div>:null}

          {loading?<button type='button' className='btn bg-main text-light'>
    <i className='fas fa-spinner fa-spin'></i>
    </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login
        </button>}
        <Link className='ps-3' to={'/register'}>Register Now</Link>
        <Link className='ps-3' to={'/forgotpassword'}>Forgot Password?</Link>
        
        </form>
      </div>
    </>
}
