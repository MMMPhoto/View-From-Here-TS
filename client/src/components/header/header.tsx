import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { logout } from "../../utils/auth.js";
import { HeaderBar, Title, NavBar } from "./styles";
// import "./header.css";

const Header = ((props: any) => {
  return (
    <HeaderBar className="navbar navbar-expand-lg navbar-light bg-dark">
      {/* <div className="container"> */}
        <Title>
          View From Here
        </Title>          
        {props.loggedIn
          ? <NavBar>
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink
                onClick={logout}
                to="signup"
              >
                Logout
              </NavLink>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </NavBar>
          : <NavBar>
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink to="/login">
                Login
              </NavLink>
              <NavLink to="/signup">
                Signup
              </NavLink>
            </NavBar>
          }
    </HeaderBar>
  );
});

export default Header;
