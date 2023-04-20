import styled from "styled-components";
import { AppBar, AppBarTitle } from "@react-md/app-bar";
import { Card } from "react-md";
import { Button } from "react-md";

export const HeaderCard = styled(Card)`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  background-color: #FFF;
  margin-top: 10px;
  width: 95vw;
`;

export const HeaderBar = styled(AppBar)`
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: center;
  border-radius: 10px;
  background-color: #FFF;
  margin: 0px;
`;

export const HomeButton = styled(Button)`
  margin-left: 10px;
`;

export const Title = styled(AppBarTitle)`
  margin-left: 0;
  position: relative;
  color: #000;
`;
