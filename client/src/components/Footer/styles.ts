import styled from "styled-components";
import { Card } from "react-md"; 

export const FooterCard = styled(Card)`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  background-color: #FFF;
  border-radius: 5px;
  margin-bottom: 35px;
  width: 98vw;
`;

export const FooterBar = styled.footer`
  position: relative;
  z-index: 2;
  /* background-position: 5% 65%; */
  /* padding-top: 10px; */
  background-color: #000;
  /* border-top: solid; */
  /* border-color: black; */
  width: 100%;
`;

export const FooterText = styled.p`
  margin: 5px;
  color: #000;
  text-align: center;
`;
