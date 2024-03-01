import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';

const PrivateRoute = () => {
    const [loggedIn, setloggedIn] = useState(false);
    console.log("gfdfgdfgdfg", loggedIn);



    // if (
    //     localStorage.getItem("Authorization")

    // ) {
    //     alert("")
    //     setloggedIn(true);
    // } else {
    //     setloggedIn(false);
    // }

    // return (
    localStorage.getItem("Authorization") ? <Outlet /> : <Navigate to="/login" />
    // )
}

export default PrivateRoute