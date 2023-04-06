import styled from "styled-components";
import { Card, CardContent } from "@react-md/card";

export const AboutContainer = styled.div`
  overflow: auto;
  margin: 30px auto; 
`;

export const AboutCard = styled(Card)`
  position: relative;
  margin: 0 auto;
  width: 60vw;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AboutContent = styled(CardContent)`
  margin: 0 auto;
  width: 95%;
`;
