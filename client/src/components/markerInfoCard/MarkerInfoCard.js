import React from "react";
import "./MarkerInfoCard.css";
import { useSpring, animated, easings } from 'react-spring';

const MarkerInfoCard = ({ marker, navigate }) => {
  // Call API for photo URL
  const url = `https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_150/v1665696442/${marker.public_id}.jpg`;
  const picStyles = useSpring({
    from: { opacity: 0, transform: 'scale(0)', maxHeight: '0px', maxWidth: '0px' },
    to: { opacity: 1, transform: 'scale(1)', maxHeight: '1000px', maxWidth: '1000px' },
    // leave: { opacity: 0, transform: 'scaleY(0)', maxHeight: '0px' },
    config: { duration: 300, easing: easings.easeInOutQuad }
  });

  return (
    <div className="info-div">
      <animated.img
        style={picStyles}
        className="marker-thumb"
        src={url}
        onClick={() => navigate(`/single-view/${marker.id}`)}
      />
    </div>
  );
};

export default MarkerInfoCard;
