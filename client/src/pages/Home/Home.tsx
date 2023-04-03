import React, { FC, useEffect, useState, useRef } from "react";
import { getAllPics } from "../../utils/api";
import MapWrapper from "../../components/Map/MapWrapper";
import { useSpring, animated, easings } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { saveMarkers, saveBounds, selectMarkers, selectBounds } from "../../store/mapStateSlice";
import { Photo } from "../../types/Photo";

const Home: FC<{}> = () => {

  // Set marker state
  const [markers, setMarkers] = useState<Photo[]>([]);

  // Define React Redux functions
  const savedMarkers = useSelector(selectMarkers);
  const dispatch = useDispatch();

  // Query height of window to set map height, accounting for header height
  // const heightRef = useRef([window.innerHeight]);
  // const mapHeight = `${heightRef.current[0]}px`;

  const divStyles: any = useSpring({
    from: { opacity: 1, transform: 'scale(0)', maxHeight: '0px', maxWidth: '0px' },
    to: { opacity: 1, transform: 'scale(1)', maxHeight: '100%', maxWidth: '100%', flexGrow: "1", borderWidth: "10px", display: "flex", justifyContent: "center" },
    // leave: { opacity: 0, transform: 'scaleY(0)', maxHeight: '0px' },
    config: { duration: 500, easing: easings.easeInOutQuad }
  });

  // Map Container Styling
  const containerStyle = {
    width: "95%",
    height: "100%",
  };

  // Load all pictures on page load
  useEffect(() => {
    const fetchPicData = async () => {
      try {
        const response: any = await getAllPics();
        const picData: Photo[] = await response.json();
        setMarkers(picData);
        dispatch(saveMarkers(picData));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPicData();
  }, []);

  return (
    // <animated.div
    <div
      // style={divStyles}
      style={{ flexGrow: "1", borderWidth: "10px", display: "flex", justifyContent: "center" }}
    >
      <MapWrapper
        markers={markers}
        containerStyle={containerStyle}
      />
    {/* </animated.div> */}
    </div>

  );
};

export default Home;
