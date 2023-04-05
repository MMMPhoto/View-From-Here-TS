import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { saveMarkers, saveBounds, selectMarkers, selectBounds } from "../../store/mapStateSlice";
import MarkerInfoCard from "../MarkerInfoCard/MarkerInfoCard";
import { Photo } from '../../types/Photo';
import { ContainterStyle } from "../../types/ContainerStyle";
// Need to use require to avoid weird error on googleMapsApiKey property
const LoadScript = require('@react-google-maps/api').LoadScript;

const apiKey: any = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapWrapper: FC<{markers: Photo[], containerStyle: ContainterStyle}> = ({ markers, containerStyle }) => {

  const navigate = useNavigate();

  // Define React Redux functions
  const savedBounds = useSelector(selectBounds);
  const dispatch = useDispatch();

  // Set Map State
  const [map, setMap] = useState<any>(null);
  const [activeMarker, setActiveMarker] = useState<string>();
  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  // Set Bounds of Map to contain Markers
  useEffect(() => {
    if (map) {
      map.setMapTypeId("hybrid");
      const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();
      if (savedBounds && markers.length > 1) {
        return map.fitBounds(JSON.parse(savedBounds));
      } else {
        if (markers.length > 0) {
          markers.map((marker) => {
            return bounds.extend({
              lat: marker.lat,
              lng: marker.lng,
            });
          });
          // Adjust map zoom for single marker
          map.setCenter(bounds.getCenter());
          markers.length === 1 ? map.setZoom(12) : map.fitBounds(bounds);
        };
      };      
    };
  }, [map, markers]);

  // Handle Active Marker change
  const handleActiveMarker = (markerId: string) => {
    setActiveMarker(markerId);
  };

  // Record change in bounds
  const handleBoundsChange = () => {
    if (markers.length > 1) dispatch(saveBounds(JSON.stringify(map.getBounds())));
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
     <GoogleMap
        zoom={4.5}
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onBoundsChanged={handleBoundsChange}
        options={{
          gestureHandling: 'greedy',
          streetViewControl: false,
          fullscreenControl: false,
          minZoom: 2.5,
          zoomControlOptions: {
            position: 8 // Shorthand for LEFT_CENTER
          },
          mapTypeControlOptions: {
            style: 2, // Shorthand for DROPDOWN_MENU
            position: 4 // Shorthand for RIGHT_CENTER
          }
        }}
      >
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onMouseOver={() => handleActiveMarker(marker.id)}
              onClick={() => handleActiveMarker(marker.id)}
            >
              {activeMarker === marker.id && markers.length > 1
                ? <InfoWindow
                    key={marker.id} 
                    position={{lat: marker.lat, lng: marker.lng}}
                    >
                    <MarkerInfoCard marker={marker} navigate={navigate} />
                  </InfoWindow>
                : null
              }
            </Marker>
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWrapper;
