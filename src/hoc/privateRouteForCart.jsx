import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRouteForCart({ isAuth, children }) {

    if(!isAuth){
        return <Navigate to={'/login'}/>
    }

    return children
}