import { FC } from "react";
import { AppSizeListener, DropdownMenu } from "react-md";
import { MenuItem } from "@react-md/menu";

import {
  ArrowDropDownSVGIcon,
  MenuSVGIcon,
  MoreVertSVGIcon,
  SearchSVGIcon,
} from "@react-md/material-icons";
import { useNavigate } from "react-router-dom";

import { logout } from "../../utils/auth.js";
import { HeaderBar, Title } from "./styles";

const Header: FC<{loggedIn: boolean}> = ({loggedIn}) => {
  const navigate = useNavigate();

  return (
    <AppSizeListener>
      <HeaderBar>
          <Title>
            View From Here
          </Title>          
          {loggedIn
            ? <DropdownMenu id="dropdown-menu" buttonType="icon" buttonChildren={<MenuSVGIcon />}>
                <MenuItem onClick={() => navigate("/")}>
                  Home
                </MenuItem>
                <MenuItem
                  onClick={logout}
                >
                  Logout
                </MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>               
              </DropdownMenu>
            : <DropdownMenu id="dropdown-menu" buttonType="icon" buttonChildren={<MenuSVGIcon />}>
                <MenuItem onClick={() => navigate("/")}>
                  Home
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
