import React from 'react'
import { Outlet } from "react-router-dom"

const DashboardPage = () => {
    return (
        <div className='w-full'>
            <Outlet />
        </div>
    )
}

export default DashboardPage