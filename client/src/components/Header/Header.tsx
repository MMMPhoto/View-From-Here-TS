import { FC, useState, useRef, useEffect } from "react";
import { AppSizeListener, DropdownMenu } from "react-md";
import { MenuItem } from "@react-md/menu";
import { MenuSVGIcon } from "@react-md/material-icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth.js";
import { HeaderBar, Title } from "./styles";

const Header: FC<{loggedIn: boolean}> = ({loggedIn}) => {
  const navigate = useNavigate();

  // Query width of window to set nav menu
  const widthRef = useRef([window.innerWidth]);
  const screenWidth = widthRef.current[0];
  const [horizontal, setHorizontal] = useState<boolean>(false);

  useEffect(() => {
    if (screenWidth  > 600) setHorizontal(true);
  }, []);

  return (
    <AppSizeListener>
      <HeaderBar height="dense">
          <Title>
            View From Here
          </Title>          
          {loggedIn
            ? <DropdownMenu 
                id="dropdown-menu" 
                buttonType="icon" 
                buttonChildren={<MenuSVGIcon />}
                horizontal={horizontal}
              >
                <MenuItem onClick={() => navigate("/")}>
                  Home
                </MenuItem>
                <MenuItem onClick={() => navigate("/about")}>
                  About
                </MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={logout}
                >
                  Logout
                </MenuItem>               
              </DropdownMenu>
            : <DropdownMenu
                id="dropdown-menu" 
                buttonType="icon" 
                buttonChildren={<MenuSVGIcon />}
                horizontal={horizontal}
                aria-hidden={false}
              >
                <MenuItem onClick={() => navigate("/")}>
                  Home
                </MenuItem>
                <MenuItem onClick={() => navigate("/about")}>
                  About
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => navigate("/signup")}>
                  Signup
                </MenuItem>
              </DropdownMenu>
          }
      </HeaderBar>
      </AppSizeListener>
  );
};

export default Header;
