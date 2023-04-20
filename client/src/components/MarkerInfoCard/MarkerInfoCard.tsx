import { FC } from "react";
import "./MarkerInfoCard.css";
import { useSpring, animated, easings } from '@react-spring/web';
import { Photo } from "../../types/Photo";

const MarkerInfoCard: FC<{ marker: Photo, navigate: Function }> = ({ marker, navigate }) => {
  // Call API for photo URL
  const url: string = `https://res.cloudinary.com/dwuqez3pg/image/upload/c_scale,w_300/v1665696442/${marker.public_id}.jpg`;
  const picStyles: any = useSpring({
    from: { opacity: 0, transform: 'scale(0)', maxHeight: '0px', maxWidth: '0px' },
    to: { opacity: 1, transform: 'scale(1)', maxHeight: '1000px', maxWidth: '1000px' },
    // leave: { opacity: 0, transform: 'scaleY(0)', maxHeight: '0px' },
    config: { duration: 100, easing: easings.easeInOutQuad }
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
