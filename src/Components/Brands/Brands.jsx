import React from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Brands() {
  
  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
}
let {data , isLoading } = useQuery('brands' , getBrands)
  return <>
    {isLoading ?
<div className="loading">
<i className='fas fa-spinner fa-spin f'></i>
</div>
: <div className="container">
  <h1 className='text-main text-center m-5'> All Brands</h1>
  <div className="row g-4">
  {data?.data.data.map((brand ,index)=> 
  <div key={index} className="col-md-3 ">
<div  data-bs-toggle="modal" data-bs-target={'#' + brand._id} className="card">
  <div  className="card-img">
    <img  alt={brand.name} className="img-fluid" src={brand.image}/>
      </div>
      <div  className="card-body">
        <p  className="text-center">{brand.name}</p>
        </div>
        </div>
  </div>

    )}
  {data?.data.data.map((brand ,index)=>
  <div key={index} id={brand._id} tabIndex="-1" aria-labelledby="exampleModalLabel" className="modal fade" aria-modal="true" role="dialog"  >
  <div  className="modal-dialog">
  <div   className="modal-content">
    <div   className="modal-header">
      <button type="button" data-bs-dismiss="modal" aria-label="Close" className="btn-close"></button>
      </div>
      <div  className="modal-body">
        <div  className="container">
          <div  className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6">
            <h1>{brand.name}</h1>
            <p>{brand.name}</p>
            </div>
            <div className="col-md-6">
              <img  alt={brand.name} className="img-fluid" src={brand.image}/>
              </div>
              </div>
              </div>
              </div>
          <div className="modal-footer">
  <button   type="button" data-bs-dismiss="modal" className="btn btn-secondary">Close</button>
  </div>
  </div>
  </div>
  </div>
  )}
  </div>
</div>
}



</>
}