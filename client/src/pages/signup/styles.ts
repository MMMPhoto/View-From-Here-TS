import styled from "styled-components";
import { Card, CardContent } from "@react-md/card";

export const Container = styled("div")`
  padding: 72px 16px 0 16px;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  height: auto;
  background-color: #FFF;
`;

export const FormCard = styled(Card)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormContent = styled(CardContent)`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-basis: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

