import React, { useEffect, useState } from "react";
import { getAllPics } from "../../utils/api";
import "./home.css";
import "../../components/searchFooter/searchFooter.css";
import MapWrapper from "../../components/map/MapWrapper";
import { useSelector, useDispatch } from 'react-redux';
import { saveMarkers } from "../../features/mapState/mapStateSlice";
import { json } from "react-router-dom";

const Home = (props) => {
  // Set marker state
  const [markers, setMarkers] = useState("");
  const [tempMarkers, setTempMarkers] = useState("");
  const [tempMarkerIndex, setTempMarkerIndex] = useState(null);
  const [markerLoaded, setMarkerLoaded] = useState(false);

  // Define React Redux functions
  const savedMarkers = useSelector((state) => state.mapState.markers);
  const dispatch = useDispatch();

  // Map Container Styling
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  // Load all pictures on page load
  useEffect(() => {
    const fetchPicData = async () => {
      try {
        const response = await getAllPics();
        const jsonData = await response.json();

        setMarkerLoaded(true);
        console.log(jsonData);
        setTempMarkerIndex(0);
        setMarkers(jsonData);
        dispatch(saveMarkers(jsonData));
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPicData();
  }, []);

  useEffect(() => {
      setTimeout(() => {
      }, 1000)
      console.log(`tempMarkers: ${tempMarkers}`);
      // setMarkers(current => [...current, JSON.parse(tempMarkers[tempMarkerIndex])]);
      console.log(markers);
    // };
  }, [markers, tempMarkers]);

  return (
    <>
      <div id="map" className="">
        <MapWrapper markers={markers} containerStyle={containerStyle} markerLoaded={markerLoaded} />
      </div>
    </>
  );
};

export default Home;
