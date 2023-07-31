import React, { useContext } from 'react'
import { chatContext } from '../context/ChatContext'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { auth } from '../config/firebase'

const Navbar = () => {
    // getting user data
    const { activeUser } = useContext(chatContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        signOut(auth)
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }
    return (
        <div className='w-full h-[80px]  bg-[#37474f] text-white'>
            <div className='flex h-full flex-row justify-between items-center px-12'>
                <h4 className='font-bold text-xl'> Hello {activeUser.displayName}</h4>
                <button onClick={handleLogout}
                    className='capitalize font-semibold text-sm rounded-md px-3 py-2 hover:bg-white hover:text-black'
                >logout</button>
            </div>
        </div>
    )
}

export default Navbar