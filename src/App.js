import { BrowserRouter, Routes, Route, } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/Component/Modal/Modal.css";
import Home from "../src/View/Home/Index";
import Login from "./Athentication/Login";

import MainLayout from "./Layout/MainLayout";
import Driver from "./pages/Driver";
import Users from "./pages/Users";
import Bookings from "./pages/Bookings";
import UserBookings from "./pages/UserBookings";

const App = () => {
  const isLogin = localStorage.getItem("Authorization")

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Driver" element={<Driver />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/DriverBookings/:id" element={<Bookings />} />
            <Route path="/UserBookings" element={<UserBookings />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

// vip_font_url:137.184.218.7:4052
// email:b@gmail.com
// pass:123456
