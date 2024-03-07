import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Categories from '../Categories/Categories'



export default function SubCategories() {
    const [SubCategory, setSubCategory]= useState({})
    const [loading, setLoading]= useState(true)
    let {id} = useParams()
    async function getSubCategory(){
        
        let{data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
        setSubCategory(data.data)
        console.log(data.data)
        setLoading(false)
    }
    useEffect(()=>{
    getSubCategory(id)
    },[])

    return <>
    {loading ?
    <div className=" row justify-content-center align-items-center vh-100">
    <button type='button' className='btn bg-main text-light'>
    <i className='fas fa-spinner fa-spin'></i>
    </button>
    </div>
    : 
<div className="container">
<h2 class="text-center green my-3 "></h2>
<div  class="row gy-3">
    {SubCategory.map(card => 

            <div  class="col-md-4 ">
                <div  class="card">
                    <p   class="h3 text-center p-3">{card.name}</p>
                        </div>
                        </div>  
                        
    )}
</div>
</div>
}
</>

}