import styled from "styled-components";
import { Card, CardHeader, CardContent } from "@react-md/card";
import { Button } from "@react-md/button";
import { FavoriteBorderSVGIcon, FavoriteSVGIcon } from "@react-md/material-icons";


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

export const PicCard = styled.div`
  border: 1px solid black;
  width: 90%;
  height: auto;
  margin: 30px 30px;
`;

export const FavButton = styled(Button)`
  position: absolute;
  padding: 0;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: rgba(20,20,20,0.2);
  @media (min-width: 600px) {
    width: 65px;
    height: 65px;
  }
`;


export const UnsavedIcon = styled(FavoriteBorderSVGIcon)`
  width: 20px;
  height: 20px;
  @media (min-width: 600px) {
    width: 65px;
    height: 65px;
  }
`;

export const SavedIcon = styled(FavoriteSVGIcon)`
  width: 20px;
  height: 20px;
  color: red;
  @media (min-width: 600px) {
    width: 65px;
    height: 65px;
  }
`;
