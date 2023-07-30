import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    // uploading profile pic image
    const uploadImage = (e) => {
        e.preventDefault()
    }
    // using formik
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            profileImg: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: async (values) => {

        },
        onSubmit: async (values) => {

        }
    })

    // navigation
    const navigate = useNavigate()
    return (
        <div className='w-full'>
            <h5 className='py-2 text-center font-semibold text-sm capitalize'>Register</h5>
            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-center'>
                <input type='text' id='username' onChange={formik.handleChange}
                    value={formik.values.username} placeholder='username'
                    className='w-[80%] px-5 mt-3 py-2 rounded-lg font-semibold text-sm text-black bg-white'
                />
                <input type='email' id='email' onChange={formik.handleChange}
                    value={formik.values.email} placeholder='your email'
                    className='w-[80%] px-5  mt-3 py-2 rounded-lg font-semibold text-sm text-black bg-white'
                />
                <input type='password' id='password' onChange={formik.handleChange}
                    value={formik.values.password} placeholder='password'
                    className='w-[80%] px-5 mt-3 py-2 rounded-lg font-semibold text-sm text-black bg-white'
                />
                <div className='w-[80%] mt-3  text-black'>
                    <label htmlFor='profileImg'
                        className='font-semibold text-sm w-full hover:underline text-center px-5 py-2 hover:text-pink-400 rounded-md'
                    >upload your profile image</label>
                    <input type='file' id='profileImg' value={formik.values.profileImg}
                        onChange={uploadImage}
                        className='hidden' />

                </div>
                <button
                    className='w-[80%] mt-5 mb-5 text-center bg-cyan-600 hover:bg-cyan-200 py-2 rounded-lg font-semibold text-sm text-black'
                >
                    Register
                </button>
                <p>
                    <span className='font-semibold text-xs text-black'>Already have an account</span>
                    <span className='capitalize text-cyan-700 text-xm font-semibold hover:text-cyan-300
                    hover:underline ml-10'
                        onClick={() => navigate('/')}
                    >Login</span>
                </p>

            </form>
        </div>
    )
}

export default Register