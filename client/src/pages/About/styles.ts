import styled from "styled-components";
import { Card, CardContent } from "@react-md/card";

export const AboutContainer = styled.div`
  overflow: auto;
  margin: 20px auto; 
`;

export const AboutCard = styled(Card)`
  position: relative;
  margin: 0 auto;
  width: 90vw;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    width: 50vw;
  }
`;

export const AboutContent = styled(CardContent)`
  margin: 0 auto;
  width: 95%;
`;
