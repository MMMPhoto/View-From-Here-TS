import styled from "styled-components";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { NavLink } from "react-router-dom";

export const HeaderBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  background-color: #868cc4;
  height: 70px;
  border-bottom: 2px solid #000;
  &:before {
    content: "";
    background-image: url("./assets/clouds.jpg");
    background-size: cover;
    position: absolute;
    height: 70px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 40%;
  }
`;

export const Title = styled(AppBarTitle)`
  position: relative;
  color: #000;
`;
