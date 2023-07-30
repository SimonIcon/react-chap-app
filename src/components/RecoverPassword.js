import React from 'react'
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
const RecoverPassword = () => {
    //navigate
    const navigate = useNavigate()
    // using formik
    const formik = useFormik({
        initialValues: {
            email: "",

        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: async (values) => {
            navigate('/')
        },
        onSubmit: async (values) => {

        }
    })
    return (
        <div className='w-full'>
            <h5 className='py-5 text-center font-semibold text-sm capitalize'>Login</h5>
            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-start'>
                <input type='email' id='email' onChange={formik.handleChange}
                    value={formik.values.email} placeholder='your email'
                    className='w-[80%] px-5 mt-6 py-2 bg-white rounded-lg font-semibold text-sm text-black'
                />
                <button type='submit'
                    className='w-[80%] mt-5 mb-5 text-center bg-cyan-600 hover:bg-cyan-200 py-2 rounded-lg font-semibold text-sm text-black'
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default RecoverPassword