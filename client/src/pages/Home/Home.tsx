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

  // Map Container Styling
  const containerStyle = {
    width: "100%",
    height: "100%"
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
    <div style={{ flexGrow: "1" }}
    >
      <MapWrapper
        markers={markers}
        containerStyle={containerStyle}
      />
    </div>
  );
};

export default Home;
