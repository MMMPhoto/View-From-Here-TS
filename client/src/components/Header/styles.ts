import styled from "styled-components";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { Card } from "react-md";
import { NavLink } from "react-router-dom";

export const HeaderCard = styled(Card)`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  background-color: #FFF;
  margin-top: 10px;
  width: 98vw;
`;

export const HeaderBar = styled(AppBar)`
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  border-radius: 10px;
  background-color: #FFF;
  /* height: 70px; */
  /* border-bottom: 2px solid #000; */
  margin: 0px;
  /* &:before {
    content: "";
    background-image: url("./assets/clouds.jpg");
    background-size: cover;
    position: absolute;
    /* height: 70px; */
    /* top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 40%;
  } */
`;

export const Title = styled(AppBarTitle)`
  position: relative;
  color: #000;
`;
