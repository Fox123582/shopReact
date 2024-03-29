import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRouteForAccountPage({ isAuth, children }) {

    if(!isAuth){
        return <Navigate to={'/login'}/>
    }

    return children
}