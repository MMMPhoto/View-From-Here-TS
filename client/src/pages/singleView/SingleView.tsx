import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import MapWrapper from "../../components/map/MapWrapper";
import "./SingleView.css";
import { loggedIn, getToken } from "../../utils/auth";
import { getOnePic, savePic } from "../../utils/api";
// import { useSelector, useDispatch } from 'react-redux';
// import { saveSavedPhotos, selectSavedPhotos } from "../../features/userSavedPhotos/userSavedPhotosSlice";
import { Photo } from "../../types/Photo";
import { ContainterStyle } from "../../types/ContainerStyle";


const SingleView: FC<{}> = () => {
  const { pictureId } = useParams<string>();
  const [pictureData, setPictureData] = useState<Photo[]>([]);
  const [picUrl, setPicUrl] = useState<string>("");
  const [tags, setPicTags] = useState<string[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Define React Redux functions
  // const savedPhotos: any=[] = useSelector(selectSavedPhotos);
  // const dispatch = useDispatch();

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
    width: "60vh",
    height: "60vh",
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
        // console.log(`User saved photos from store: ${savedPhotos}`);
        // console.log(savedPhotos);
        // const thisPhoto: Photo = savedPhotos.find((thisPhoto: Photo) => thisPhoto.id === pictureId)
        // if (thisPhoto) {
        //   setSavedPhoto(true);
        // };
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
    <div
      className="d-flex flex-column align-items-center p-4"
      id="singleViewBg"
    >
      {isLoggedIn ? (
        <p className="save-pic">Click the heart to save the photo!</p>
      ) : (
        <p className="save-pic">You must be logged in to save photos!</p>
      )}
      <div
        className="d-flex flex-row justify-content-center align-items-center"
        id="savePhoto"
      >
        <h3>
          <GrFavorite onClick={() => handleSavePhoto(pictureData[0].id)} />
        </h3>
        {isSavedPhoto ? (
          <p className="ms-3 mb-0 save-pic">Photo saved!</p>
        ) : (
          <div></div>
        )}
      </div>
      <img className="single-pic p-4" src={picUrl} id="singleViewImg" />
      <div id="singleViewMap">
        {pictureData ? (
          <MapWrapper markers={pictureData} containerStyle={containerStyle} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SingleView;
