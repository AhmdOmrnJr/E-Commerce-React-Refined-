import React from 'react'
import Product from '../Product/Product'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Products() {

  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data, isLoading } = useQuery("products", getAllProducts)

  console.log(data?.data.data);

  return <>
    {isLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
    <div className='row'>
      {data?.data.data.map((product) => {
        return <Product key={product._id} product={product} />
      })}
    </div>
  </>
}
