import React from 'react'
import styles from "../styles/general.module.scss"
import { useNavigate } from "react-router-dom"


const Home = () => {
    // navigation
    const navigate = useNavigate()
    return (
        <div className='w-full'>
            <p>hello you are in home page</p>
            <button onClick={() => navigate('/dashboard/chat')}
                className={`${styles.messageButton} font-semibold bg-cyan-600 hover:bg-cyan-200`}>start chat</button>
        </div>
    )
}

export default Home