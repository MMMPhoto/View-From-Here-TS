import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { GrFavorite } from "react-icons/gr";
import "./MarkerInfoCard.css";
import { savePic } from "../utils/api";

const MarkerInfoCard = ({ marker, navigate }) => {
  // Set state for saved photo
  const [isSavedPhoto, setSavedPhoto] = useState(false);

  // Set url to lower resolution for thumbnail
  let urlArray = marker.url.split("/");
  let url = `${urlArray[0]}/${urlArray[1]}/${urlArray[2]}/${urlArray[3]}/${urlArray[4]}/${urlArray[5]}/c_scale,w_150/${urlArray[6]}/${urlArray[7]}`;
  url = url.replace("heic", "jpg");

  // Handle save photo
  const handleSavePhoto = () => {
    // To Do: Add work to save to user's saved photos in database
    setSavedPhoto(true);
  };

  return (
    <div className="info-div">
      <h6>{marker.title}</h6>
      <img
        className="marker-thumb"
        src={url}
        onClick={() => navigate(`/single-view/${marker.id}`)}
      />
      <div className="d-flex flex-row justify-content-around align-items-center mt-2">
        <h3>
          <GrFavorite onClick={() => handleSavePhoto()} />
        </h3>
        {isSavedPhoto ? <p className="mb-0">Photo saved!</p> : <></>}
      </div>
    </div>
  );
};

export default MarkerInfoCard;
