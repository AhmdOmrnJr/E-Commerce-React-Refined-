import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';

export default function Brands() {


  function getAllBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let { data, isLoading } = useQuery("brands", getAllBrands)

  console.log(data?.data.data);



  return <>
    {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
    <div className='row vh-100'>
      <div className='h-75 col-md-2 overflow-y-scroll'>
        {data?.data.data.map((brand) => {
          return <div key={brand._id} >
            <div className="product overflow-hidden p-2 cursor-pointer ">
              <Link className='cursor-pointer' to={'brands/' + brand._id} >
                {/* <img className='w-100'  src={brand.image} alt={brand.name} /> */}
                <h5 className='font-sm text-main'>{brand.name}</h5>
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