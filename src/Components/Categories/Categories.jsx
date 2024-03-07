import React from 'react';
import styles from './Categories.module.css';
import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom';
import SubCategories from '../SubCategories/SubCategories';
export default function Categories() {

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
let {data , isLoading } = useQuery('Categories' , getCategories)
console.log(data?.data.data)
  return <>
    {isLoading ?
<div className="loading">
<i className='fas fa-spinner fa-spin f'></i>
</div>
:
<div className="category row g-4">
{data?.data.data.map(category=> 
      <div key={category._id} className="col-md-4 ">
        <Link to={`/categories/${category._id}/subcategories`}> 
        <div   className="card">
          <div   className="card-img">
            <img   alt={category.name} className="img-fluid w-100" height={300} src={category.image}/>
            </div>
            <div   className="card-body">
              <p   className="text-success h3 text-center">{category.name}</p>
              </div>
              </div>
              </Link>
              </div>
              
        )}
        
</div>

}
</>

}