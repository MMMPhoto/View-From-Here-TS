import styled from "styled-components";
import { Container } from "../../styles/styles";
import { Card, CardHeader, CardContent } from "@react-md/card";
import { Form } from "@react-md/form";
import { Button } from "@react-md/button";

export const ProfileContainer = styled.div`
  overflow: auto;
  margin: 40px auto;  
`;

export const ProfileCard = styled(Card)`
  position: relative;
  width: 85vw;
  padding: 20px;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const UserInfo = styled.div`
  margin-top: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileContent = styled.div`
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

export const PicGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;


export const PicCard = styled(Card)`
  border: 1px solid lightgray;
  border-radius: 5%;
  height: 100px;
  width: 100px;
  margin: 3px;
  @media (min-width: 600px) {
    height: 150px;
    width: 150px;
  }
`;

export const DeleteButton = styled(Button)`
  float: right;
  width: 20px;
  height: 20px;
  background-color: lightgray;
  @media (min-width: 600px) {
    height: 25px;
    width: 25px;
  }
`;

export const Upload = styled.div`
  margin: 20px 20px;
  width: 100%;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    justify-content: space-around;
  }
`;

export const UploadForm = styled(Form)`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const SubmitButton = styled(Button)`
  margin: 5px;
  background-color: #d1d4ed;
`;
