import styled from "styled-components";
import { Card, CardHeader, CardContent } from "@react-md/card";
import { Form } from "@react-md/form";
import { Button } from "@react-md/button";

export const Background = styled.div`
  padding-top: 40px;
  flex-grow: 1;
`;

export const SingleViewCard = styled(Card)`
position: relative;
  margin: 0 auto;
  width: 85vw;
  padding: 200px;
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
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileContent = styled.div`
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

export const PicGrid = styled.div`
  width: 100%;
  display: flex;
  flex-basis: 100%;
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

export const Upload = styled.div`
  margin-top: 0px;
  width: 100%;
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

export const UploadForm = styled(Form)`

`;

export const SubmitButton = styled(Button)`
  margin: 5px;
  background-color: #d1d4ed;
`;
