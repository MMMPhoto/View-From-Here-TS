import React, { FC, useEffect, useState, useRef } from "react";
import { getAllPics } from "../../utils/api";
import MapWrapper from "../../components/Map/MapWrapper";
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
  const heightRef = useRef([window.innerHeight]);
  const mapHeight = `${heightRef.current[0] - 70}px`;

  // Map Container Styling
  const containerStyle = {
    width: "100vw",
    height: mapHeight,
  };

  // Load all pictures on page load
  useEffect(() => {
    const fetchPicData = async () => {
      try {
        const response: any = await getAllPics();
        const picData: Photo[] = await response.json();
        // console.log(picData);
        setMarkers(picData);
        dispatch(saveMarkers(picData));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPicData();
  }, []);

  return (
      <MapWrapper
        markers={markers}
        containerStyle={containerStyle}
      />
  );
};

export default Home;
