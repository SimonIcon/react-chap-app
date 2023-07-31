import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import { chatContext } from '../context/ChatContext'

const Login = () => {
    // contect data
    const { handleLogin, activeUser } = useContext(chatContext)
    // navigation
    const navigate = useNavigate()
    // email validation
    function isValidEmail(e) {
        const re = /\S+@\S+\.\S+/;
        return re.test(e);
    }
    // using formik

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: async (values) => {
            const error = {}
            if (!values.email) {
                error.email = toast.error('email required')
            } else if (!isValidEmail(values.email)) {
                error.email = toast.error('invalid email')
            } else if (values.password.length < 6) {
                error.password = toast.error('weak password')
            }
            return error
        },
        onSubmit: async (values) => {
            handleLogin(values.email, values.password)
            if (activeUser.uid) {
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000);
            }
        }
    })
    // navigation

    return (
        <div className='w-full'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <h5 className='py-5 text-center font-semibold text-sm capitalize'>Login</h5>
            <form onSubmit={formik.handleSubmit} className='flex flex-col items-center justify-start'>
                <input type='email' id='email' onChange={formik.handleChange}
                    value={formik.values.email} placeholder='your email'
                    className='w-[80%] px-5 mt-6 py-2 bg-white rounded-lg font-semibold text-sm text-black'
                />
                <input type='password' id='password' onChange={formik.handleChange}
                    value={formik.values.password} placeholder='password'
                    className='w-[80%] px-5 mt-6 mb-5 py-2  bg-white rounded-lg font-semibold text-sm text-black'
                />
                <p className='w-[80% items-center justify-center'>
                    <span className='font-semibold text-xs text-black'>forgot password</span>
                    <span className='capitalize text-green-700 text-xm font-semibold hover:text-green-300
                    hover:underline ml-10'
                        onClick={() => navigate("/recover-password")}
                    >Recover</span>
                </p>
                <button
                    className='w-[80%] mt-5 mb-5 text-center bg-cyan-600 hover:bg-cyan-200 py-2 rounded-lg font-semibold text-sm text-black'
                >
                    Login
                </button>
                <p>
                    <span className='font-semibold text-xs text-black'>Dont have an account</span>
                    <span className='capitalize text-cyan-700 text-xm font-semibold hover:text-cyan-300
                    hover:underline ml-10'
                        onClick={() => navigate('/signUp')}
                    >Register</span>
                </p>
            </form>
        </div>
    )
}

export default Login