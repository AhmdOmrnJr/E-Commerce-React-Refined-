import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authContext } from '../../Contexts/AuthContext'

export default function Login() {

  let navigate = useNavigate()
  let { setIsUserLoggedIn } = useContext(authContext)

  function login() {
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formik.values)
  }

  const { mutate, isLoading, error, isSuccess, data } = useMutation(login);
  //  console.log(data);
  if (isSuccess) {
    localStorage.setItem('token', data.data.token)
    setIsUserLoggedIn(true)
    navigate('/home')
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'must have at least one number, at least one special character and must be greater than 6 characters and max 16 characters'),
  })


  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: mutate

  })


  return <>
    <div className='w-75 m-auto my-5'>
      <h1>Login now:</h1>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id='email' name='email' className='form-control mb-3' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id='password' name='password' className='form-control mb-3' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}

        {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> : null}

        {isLoading ? 
        <button disabled type="button" className='btn bg-main text-white px-3 ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
        :
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white px-3 ms-auto d-block'>login</button>}

      <Link className='text-main' to={'/forgotpassword'}>Forgot Password ...</Link>
      <br />
      <Link className='text-main' to={'/register'}>Register now ...</Link>

      </form>
    </div>
  </>


}
