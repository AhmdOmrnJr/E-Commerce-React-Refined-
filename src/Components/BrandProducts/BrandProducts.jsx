import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'
import { useQuery } from 'react-query'

const getBrandDetails = async (brandId) => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands/" + brandId);
  return response.data.data;
};

function getAllProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}

export default function BrandProducts() {

  let params = useParams()



  const { data: brandsData, error, isLoading: brandsIsLoading } = useQuery(['brands', params.id], () => getBrandDetails(params.id));
  console.log(brandsData);



  let { data: productsData, isLoading: productsIsLoading } = useQuery("products", getAllProducts)
  console.log(productsData?.data.data);


  return <>
    <div>
      {brandsIsLoading || productsIsLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
      {/* <h2 className='text-main'>{brandDetails.name}</h2> */}
      <div className="row">
        {productsData?.data.data.map((product) => {
          if (product.brand._id == params.id) {
            return <Product key={product._id} product={product} />
          }
        })}
      </div>
    </div>
  </>
}
