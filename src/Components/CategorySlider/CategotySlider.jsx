import React from 'react'
import axios from 'axios';
import Slider from "react-slick";
import { useQuery } from 'react-query';

export default function CategotySlider() {


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 5,
    };

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let { data, isLoading } = useQuery("Categories", getAllCategories)
    
    console.log(data?.data.data)

    return <>
        {isLoading ?
            <>
                <div className="text-center">
                    <i className='fas fa-spinner fa-spin fa-2x py-5 my-5'></i>
                </div>
            </>
            :
            <div className="mb-5">
                <Slider {...settings}>
                    {data?.data.data.map((category, id) => {

                        return <div key={category._id}>
                            <img className='w-100' height={150} src={category.image} alt={category.name} />
                            <h5 className='font-sm text-main'>{category.name}</h5>
                        </div>
                    })}
                </Slider>
            </div>
        }

    </>
}
