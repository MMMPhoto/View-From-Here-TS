import styled from "styled-components";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { NavLink } from "react-router-dom";

export const HeaderBar = styled(AppBar)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  background-color: #868cc4;
  width: 100.9%;
  min-height: 12vh;
  border-bottom: 2px solid #000;
  &:before {
    content: "";
    background-image: url("./assets/clouds.jpg");
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 40%;
  }
`;

export const Title = styled(AppBarTitle)`
  position: relative;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 8vh;
  color: #000;
  width: 100%;
  height: auto;
  @media (min-width: 600px) {
    font-size: 6vh;
    width: 40%;
  }
`;
