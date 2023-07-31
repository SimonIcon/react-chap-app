import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import addProfile from "../config/image"
import styles from "../styles/register.module.scss"
import { chatContext } from '../context/ChatContext'
import { toast, Toaster } from 'react-hot-toast'


const Register = () => {
    // chat context variables
    const { registerUser, uploadingStatus } = useContext(chatContext)
    // using formik
    const [profileImg, setProfileImg] = useState([])
    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setProfileImg(selectedFiles); // Save the selected files array to state
    };
    // validating email
    function isValidEmail(e) {
        const re = /\S+@\S+\.\S+/;
        return re.test(e);
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: async (values) => {
            const error = {}
            if (!values.email) {
                error.email = toast.error('email required')
            } else if (!isValidEmail(values.email)) {
                error.email = toast.error('invalid email')
            } else if (!values.username || values.username === "") {
                error.username = toast.error('username required')
            } else if (values.password.length < 6) {
                error.password = toast.error('weak password')
            } else if (profileImg[0].name.length < 1) {
                error.profileImg = toast.error('profile image required')
            }

            return error
        },
        onSubmit: async (values) => {
            registerUser(values.email, values.password, values.username, profileImg[0].name)
            setTimeout(() => {
                navigate('/')
            }, 2000);

        },

    })

    // navigation
    const navigate = useNavigate()
    return (
        <div className='w-full'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
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
                        className='flex flex-row items-center justify-evenly'
                    >
                        <img src={addProfile} alt='add profile'
                            className={styles.image} />
                        <span className='text-black text-sm font-semibold w-[50%]'>
                            {
                                uploadingStatus < 0 ? (<span>upload your profile image</span>) : (<div>
                                    {uploadingStatus > 99 ? (<span className='text-green-600'>uploading complete</span>) : (
                                        <span className={`px-2 py-3 w-${uploadingStatus} bg-green-500`}>uploading {uploadingStatus}</span>
                                    )}
                                </div>
                                )
                            }

                        </span>
                    </label>
                    <input type='file' id='profileImg'
                        onChange={handleFileChange}
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