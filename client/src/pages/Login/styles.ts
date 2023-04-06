import styled from "styled-components";
import { Card, CardContent } from "@react-md/card";
import { TextField, Password } from "@react-md/form";
import { Button } from "@react-md/button";

export const LoginContainer = styled.div`
  overflow: auto;
  margin: 20px auto;  
`;

export const FormCard = styled(Card)`
  position: relative;
  margin: 0 auto;
  width: 80vw;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 350px) {
    max-width: 350px;
  }
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

export const Input = styled(TextField)`
  margin-bottom: 15px;
`;

export const PasswordInput = styled(Password)`
  margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)`
  background-color: #d1d4ed;
`;
