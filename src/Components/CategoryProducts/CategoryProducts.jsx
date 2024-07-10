import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Product from '../Product/Product'
import { useQuery } from 'react-query';

const getCategoryDetails = async (categoryId) => {
  const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories/" + categoryId);
  return response.data.data;
};

function getAllProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}


export default function CategoryProducts() {

  let params = useParams()


  const { data: CategoryData, error, isLoading: categoryIsLoading } = useQuery(['categories', params.id], () => getCategoryDetails(params.id));
  console.log(CategoryData);



  let { data: productsData, isLoading: productsIsLoading } = useQuery("products", getAllProducts)
  console.log(productsData?.data.data);




  return <>
    <div>
      {categoryIsLoading || productsIsLoading ? <h1 className='vh-100 d-flex justify-content-center align-items-center'> <i className='fas fa-spinner fa-spin'></i></h1> : null}
        {/* <h2 className='text-main'>{categoryDetails.name}</h2> */}
      <div className="row">
        {productsData?.data.data.map((product) => {
          if (product.category._id == params.id) {
            return <Product key={product._id} product={product} />
          }
        })}
      </div>
    </div>
  </>
}


