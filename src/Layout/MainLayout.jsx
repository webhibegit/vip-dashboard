import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Login from "../Athentication/Login";

const MainLayout = () => {
  const loggedIn = localStorage.getItem("Authorization");

  return (
    <>
      {loggedIn ? (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MainLayout;
