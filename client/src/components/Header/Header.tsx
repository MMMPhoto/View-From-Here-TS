import { FC } from "react";
import { AppSizeListener, DropdownMenu } from "react-md";
import { MenuItem } from "@react-md/menu";
import { Avatar } from "@react-md/avatar";
import { MenuSVGIcon } from "@react-md/material-icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth.js";
import { User } from "../../types/User.js";
import { HeaderCard, HeaderBar, HomeButton, Title, Subtitle } from "./styles";

const Header: FC<{loggedIn: boolean, user: User | undefined}> = ({loggedIn, user}) => {
  const navigate = useNavigate();

  return (
    <AppSizeListener>
      <HeaderCard>      
        <HeaderBar height="dense">
          <HomeButton onClick={() => navigate("/")}>
            <Title>
              View From Here
            </Title> 
          </HomeButton>
          {user
            ? <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Avatar>{user!.userName.charAt(0)}</Avatar>
                <Subtitle>{user!.userName}</Subtitle>
                <DropdownMenu id="dropdown-menu" buttonType="icon" buttonChildren={<MenuSVGIcon />}>
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
              </div> 
            : <DropdownMenu id="dropdown-menu" buttonType="icon" buttonChildren={<MenuSVGIcon />}>
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
      </HeaderCard>
      </AppSizeListener>
  );
};

export default Header;
