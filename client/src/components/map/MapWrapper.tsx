import { FC, useCallback, useEffect, useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { saveMarkers, saveBounds, selectMarkers, selectBounds } from "../../features/mapState/mapStateSlice";
import MapComponent from "./Map";
import MarkerInfoCard from "../markerInfoCard/MarkerInfoCard";
import { Photo } from '../../types/Photo';
import { ContainterStyle } from "../../types/ContainerStyle";
// Need to use require to avoid weird error on googleMapsApiKey property
const LoadScript = require('@react-google-maps/api').LoadScript;

const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return (<h1>Error</h1>);
  return <h1>Loading...</h1>;
};
// interface MarkerData extends Photo {
//   position: {
//     lat: Photo["lat"],
//     lng: Photo["lng"]
//   }
// };

const MapWrapper: FC<{markers: Photo[], containerStyle: ContainterStyle, markerLoaded?: boolean }> = ({ markers, containerStyle, markerLoaded }) => {
  // Query screen size for mobile and tablet
  const isMobile: boolean = useMediaQuery({ query: '(max-width: 700px)' });
  const isTablet: boolean = useMediaQuery({ query: '(max-width: 1200px)' })
  // Set up redirect function
  const navigate = useNavigate();
  // Define React Redux functions
  const savedBounds = useSelector(selectBounds);
  const dispatch = useDispatch();

  // Set Map State
  const [map, setMap] = useState<any>(null);
  const [activeMarker, setActiveMarker] = useState<string>();
  const onLoad = (map: any) => {
    const bounds: any = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  };

  // Set Bounds of Map to contain Markers
  useEffect(() => {
    if (map) {
      const bounds: any = new window.google.maps.LatLngBounds();
      if (savedBounds && markers.length > 1) {
        return map.fitBounds(JSON.parse(savedBounds));
      } else {
        if (markers) {
          markers.map((marker) => {
            return bounds.extend({
              lat: marker.lat,
              lng: marker.lng,
            });
          });
          map.setCenter(bounds.getCenter());
          // Adjust map zoom for screen size or single marker
          if (markers.length === 1) {
            map.setZoom(12);
          } else if (isMobile) {
            map.setZoom(2);
          } else if (isTablet) {
            map.setZoom(3);
          } else {
            map.fitBounds(bounds);
          }
        };
      };      
    };
  }, [map, markers, isMobile, isTablet]);

  // Handle Active Marker change
  const handleActiveMarker = (markerId: string) => {
    setActiveMarker(markerId);
  };

  // Record change in bounds
  const handleBoundsChange = () => {
    if (markers.length > 1) {
      dispatch(saveBounds(JSON.stringify(map.getBounds())));
    };
  };

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent />
    </Wrapper>
    // <LoadScript googleMapsApiKey={apiKey}>
    //   <GoogleMap
    //     zoom={4.5}
    //     mapContainerStyle={containerStyle}
    //     onLoad={onLoad}
    //     onBoundsChanged={handleBoundsChange}
    //     options={{
    //       gestureHandling: 'greedy',
    //       mapTypeId: 'hybrid'
    //     }}
    //   >
    //     {markers &&
    //       markers.map((marker) => (
    //         <Marker
    //           key={marker.id}
    //           position={{ lat: marker.lat, lng: marker.lng }}
    //           onMouseOver={() => handleActiveMarker(marker.id)}
    //           // onLoad={() => markerDrop(marker)}
    //           animation={2}
    //           onClick={() => handleActiveMarker(marker.id)}
    //         >
    //           {activeMarker === marker.id && markers.length > 1 && (

    //                 <InfoWindow
    //                   key={marker.id} 
    //                   position={{lat: marker.lat, lng: marker.lng}}
    //                   >
    //                   <MarkerInfoCard marker={marker} navigate={navigate} />
    //                 </InfoWindow>
    //           )}
    //         </Marker>
    //       ))}
    //   </GoogleMap>
    // </LoadScript>
  );
};

export default MapWrapper;
