import React from "react";
import { authAction } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(authAction.logout());
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container-fluid">
          <div className="navbar-brand">Mail Box</div>

          <div
            className="collapse navbar-collapse"
            style={{ display: "float-right " }}
            id="navbarSupportedContent"
          >
            <ul
              className="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ margin: "float-right " }}
            >
              <li className="nav-item">
                {isLoggedIn && (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                )}
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              )}

              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <button onClick={logoutHandler} className="nav-link">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
