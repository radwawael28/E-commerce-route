import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
export default function CategriesSlider() {
    var settings = {
        dots: false,
        autoplay:true,
        autoplaySpeed:200,
        infinite: true,
        speed: 2000,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows:false
    };

    function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

let {data} = useQuery('Categories' , getCategories)
console.log(data?.data.data)
  return <>
  <div className="row">
  <Slider {...settings}>
    {data?.data.data.map(category=> 
    <div key={category._id} className="col-md-2">
    <div className="img">
        <img src={category.image} height={200} className='w-100' alt={category.name} />
    <p>{category.name}</p>
    </div>
    </div>
        )}
            
        </Slider>
        </div></>
}
