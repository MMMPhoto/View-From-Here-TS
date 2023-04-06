import styled from "styled-components";
import { Card, CardHeader, CardContent } from "@react-md/card";
import { Form } from "@react-md/form";
import { Button } from "@react-md/button";

export const SingleViewContainer = styled.div`
  overflow: auto;
  margin: 30px auto; 
`;

export const SingleViewCard = styled(Card)`
  position: relative;
  margin: 0 auto;
  width: 90vw;
  padding: 20px;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SingleViewContent = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    margin-top: 0px;
  }
`;

export const PicCard = styled(Card)`
  border: 1px solid black;
  width: 90%;
  height: auto;
  margin: 30px 30px;
`;
