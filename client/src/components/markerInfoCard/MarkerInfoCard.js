import React from "react";
import "./MarkerInfoCard.css";

const MarkerInfoCard = ({ marker, navigate }) => {
  // Call API for photo URL
  const url = `https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${marker.public_id}.jpg`;

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
