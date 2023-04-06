import React, { FC, useEffect, useState } from "react";
import { CardSubtitle, CardTitle } from "@react-md/card";
import { MediaContainer, MediaOverlay } from "@react-md/media";
import { FavoriteBorderSVGIcon } from "@react-md/material-icons";
import { useParams } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import MapWrapper from "../../components/Map/MapWrapper";
import "./SingleView.css";
import { loggedIn, getToken } from "../../utils/auth";
import { getOnePic, savePic } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { saveSavedPhotos, selectSavedPhotos } from "../../store/userSavedPhotosSlice";
import { Photo } from "../../types/Photo";
import { ContainterStyle } from "../../types/ContainerStyle";
import { SingleViewCard, SingleViewContainer, SingleViewContent, PicCard, FavButton, UnsavedIcon, SavedIcon } from "./styles";


const SingleView: FC<{}> = () => {
  const { pictureId } = useParams<string>();
  const [pictureData, setPictureData] = useState<Photo[]>([]);
  const [picUrl, setPicUrl] = useState<string>("");
  const [tags, setPicTags] = useState<string[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Define React Redux functions
  const savedPhotos: any=[] = useSelector(selectSavedPhotos);
  const dispatch = useDispatch();

  // Check login status on load
  useEffect(() => {
    const token: string = loggedIn() ? getToken() : null;
    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  // Set state for saved photo
  const [isSavedPhoto, setSavedPhoto] = useState<boolean>(false);

  // Map Container Styling
  const containerStyle: ContainterStyle = {
    width: "50vw",
    height: "50vh",
  };

  useEffect(() => {
    const getPicData = async () => {
      try {
        // Get picture Data
        const response = await getOnePic(pictureId);
        const jsonData: Photo = await response.json();
        let jsonArray: Photo[] = [];
        jsonArray.push(jsonData);
        setPictureData(jsonArray);
        jsonData.tags && setPicTags(jsonData.tags);
        console.log(`User saved photos from store: ${savedPhotos}`);
        console.log(savedPhotos);
        const thisPhoto: Photo = savedPhotos.find((thisPhoto: Photo) => thisPhoto.id === pictureId)
        if (thisPhoto) {
          setSavedPhoto(true);
        };
        // Call API to set photo URL
        const url = `https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_2000/v1665696442/${jsonData.public_id}.jpg`;
        setPicUrl(url);
      } catch (error) {
        console.log("error", error);
      }
    };
    getPicData();
  }, []);

  // Handle save photo
  const handleSavePhoto = async (picId: string) => {
    const picToSave = pictureData.find(
      (picture) => pictureData[0].id === picId
    );

    // get token
    const token = loggedIn() ? getToken() : null;

    try {
      const response = await savePic(picToSave, token);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      } else {
        setSavedPhoto(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SingleViewContainer>
      <SingleViewCard>
        { !isLoggedIn ? <CardSubtitle>You must be logged in to save photos!</CardSubtitle> : null }
        <SingleViewContent>
        <PicCard>
          <MediaContainer fullWidth={true}>
            <img src={picUrl} />
            <FavButton 
              onClick={() => handleSavePhoto(pictureData[0].id)}
            >  
              { isSavedPhoto ? <SavedIcon /> : <UnsavedIcon /> }
            </FavButton>

          </MediaContainer>
        </PicCard>
        {pictureData
          ? <MapWrapper markers={pictureData} containerStyle={containerStyle} />
          : <p>Loading...</p>
        }
        </SingleViewContent>
      </SingleViewCard>
    </SingleViewContainer>
  );
};

export default SingleView;
