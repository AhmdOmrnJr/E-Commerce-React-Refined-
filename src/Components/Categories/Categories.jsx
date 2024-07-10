import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';


export default function Categories() {

  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let { data, isLoading } = useQuery("categories", getAllCategories)

  console.log(data?.data.data);



  return <>
    {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
    <div className='row'>
      <div className="col-md-2">
        {data?.data.data.map((category) => {
          return <div key={category._id}  >
            <div className="product overflow-hidden p-2 cursor-pointer">
              <Link className='cursor-pointer' to={'categories/' + category._id} >
                {/* <img className='w-100' height={250} src={category.image} alt={category.name} /> */}
                <h5 className='font-sm text-main'>{category.name}</h5>
              </Link>
            </div>
          </div>
        })}
      </div>
      <div className="col-md-10 ps-3 py-3">
        <Outlet />
      </div>
    </div>
  </>
}


