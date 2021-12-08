import React from 'react'
import { RouteProps, Route,Redirect } from 'react-router-dom'

export interface PrivateRouteProps {
    
}

export const PrivateRoute = (props: RouteProps) => {
    //Check if user is logged in
    // if yes, show route
    // Otherwise, redirect to login page

    // const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    const isLoggedIn = Boolean(localStorage.getItem('username'))
    // console.log('Is logged in: ', isLoggedIn);
    
    if(!isLoggedIn) return <Redirect to="/login"/>
    return (
        <Route {...props} /> 
    )
}
