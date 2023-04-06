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
  width: 95vw;
`;

export const FooterText = styled.p`
  margin: 5px;
  color: #000;
  text-align: center;
`;
