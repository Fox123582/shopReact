import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRouteForRegisterPage({ isAuth, children }) {

    if(isAuth){
        return <Navigate to={'/'}/>
    }

    return children
}