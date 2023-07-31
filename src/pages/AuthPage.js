import React from 'react'
import styles from "../styles/authpage.module.scss"
import { Outlet } from "react-router-dom"

const AuthPage = () => {
    return (
        <div className={`w-full h-[100vh] ${styles.container}`}>
            <div className='flex  justify-center rounded-lg items-center w-full h-[100vh]'>
                <div className=' w-[80%] sm:w-[65%] md:w-[50%] lg:w-[40%] xl:w-[35%]'>
                    <div className='bg-slate-100 py-5 h-[73vh] text-black flex flex-col items-center'>
                        <div className='py-3 font-semibold text-xl text-black'>
                            <h3 className=''>Let`s Chat</h3>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthPage