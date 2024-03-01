import React from "react";
// import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from "../../src/Images/logo.png";

function Sidebar() {
  const navigate = useNavigate();
  // const handleClick = () => {
  //   if (document.querySelector("#DarkSwitch").checked) {
  //     document.body.classList.add("drakmode");
  //   } else {
  //     document.body.classList.remove("drakmode");
  //   }
  // };

  const handlClick = () => {
    if (document.querySelector("#backbtnsidebar").click) {
      document.querySelector(".sidebarwrap").classList.remove("show");
    } else {
      document.querySelector(".sidebarwrap").classList.remove("show");
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
    // toast.success("Logout SuccessFull");
  };
  return (
    <>
      <section className="sidebarwrap">
        <div className="top_area">
          <button id="backbtnsidebar" onClick={handlClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="logo_area">
            <div className="logo">
              {/* <img src={logo} className="img-fluid" alt="logo" /> */}
              <h1 style={{ color: "#fff" }}>Logo</h1>
            </div>
          </div>
        </div>

        <div className="sidebar_menu">
          <ul className="nav Menu_Nav accordion" id="sidemenu">
            {/***Menu 1***/}
            <li className="menuline">
              <NavLink to="/" className="" onClick={handlClick}>
                <i className="fa-solid fa-bars"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/***Menu 2***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead1">
                <Link
                  to="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#sidemenu1"
                  aria-expanded="true"
                  aria-controls="sidemenu1"
                >
                  <i className="fa-regular fa-address-card"></i>
                  <span>Portfolio</span>
                </Link>
              </div>
              <div
                id="sidemenu1"
                className="collapse"
                aria-labelledby="sidemenuhead1"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <NavLink to="page1" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Sub Menu
                      1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="page2" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Sub Menu
                      2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="page3" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Sub Menu
                      3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***Menu 3***/}
            <li className="menuline">
              <div className="menu-head" id="sidemenuhead2">
                <Link
                  to="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#sidemenu2"
                  aria-expanded="true"
                  aria-controls="sidemenu2"
                >
                  <i className="fa-solid fa-user-tie"></i>
                  <span>Manage</span>
                </Link>
              </div>
              <div
                id="sidemenu2"
                className="collapse"
                aria-labelledby="sidemenuhead2"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <NavLink to="/Driver" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Drivers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Users" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Users
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/DriverBookings" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Driver
                      Bookings
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/UserBookings" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>User
                      Bookings
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/***Menu 4***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead3">
                <Link
                  to="#"
                  className="btn btn-header-link"
                  data-toggle="collapse"
                  data-target="#sidemenu3"
                  aria-expanded="true"
                  aria-controls="sidemenu3"
                >
                  <i className="fa-solid fa-subscript"></i>
                  <span>Subscription</span>
                </Link>
              </div>
              <div
                id="sidemenu3"
                className="collapse"
                aria-labelledby="sidemenuhead3"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <NavLink to="page7" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Sub Menu
                      1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="page8" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Sub Menu
                      2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="page9" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Sub Menu
                      3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li> */}
          </ul>

          <ul className="nav Account_Nav">
            {/* <div onClick={handleLogOut} style={{ width: "100%" }}>
              <Link>
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                <span>Logout</span>
              </Link>
            </div> */}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
