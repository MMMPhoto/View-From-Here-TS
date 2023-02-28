import React from "react";
// import { Link, NavLink } from "react-router-dom";
import { AppBar, AppBarTitle, AppBarAction, AppBarTheme } from "@react-md/app-bar";
import {
  ArrowDropDownSVGIcon,
  MenuSVGIcon,
  MoreVertSVGIcon,
  SearchSVGIcon,
} from "@react-md/material-icons";

import { logout } from "../../utils/auth.js";
import { HeaderBar, Title, NavBar, NavElem } from "./styles";
// import "./header.css";

const Header = ((props: any) => {
  return (
    <HeaderBar>
      {/* <div className="container"> */}
        <Title>
          View From Here
        </Title>          
        {props.loggedIn
          ? <NavBar>
              <NavElem to="/" end>
                Home
              </NavElem>
              <NavElem
                onClick={logout}
                to="signup"
              >
                Logout
              </NavElem>
              <NavElem to="/profile">
                Profile
              </NavElem>
            </NavBar>
          : <NavBar>
              <NavElem to="/" end>
                Home
              </NavElem>
              <NavElem to="/login">
                Login
              </NavElem>
              <NavElem to="/signup">
                Signup
              </NavElem>
            </NavBar>
          }
    </HeaderBar>
  );
});

export default Header;
