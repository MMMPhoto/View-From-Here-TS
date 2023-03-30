import styled from "styled-components";
import { Card, CardContent } from "@react-md/card";
import { TextField, Password } from "@react-md/form";
import { Button } from "@react-md/button";

export const Background = styled.div`
 background-image: url(https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_1000/v1665696442/View-from-here/1ddfeb86305588512f79432b4a107ec5.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  padding-top: 70px;
  flex-grow: 1;
`;

export const FormCard = styled(Card)`
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
