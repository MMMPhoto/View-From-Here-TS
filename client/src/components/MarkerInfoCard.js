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

  // Call API for photo URL
  const url = `https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${marker.public_id}.jpg`;

  // Handle save photo
  const handleSavePhoto = () => {
    // To Do: Add work to save to user's saved photos in database
    setSavedPhoto(true);
  };

  return (
    <div className="info-div">
      <img
        className="marker-thumb"
        src={url}
        onClick={() => navigate(`/single-view/${marker.id}`)}
      />
      </div>
  );
};

export default MarkerInfoCard;
