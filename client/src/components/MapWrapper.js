import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapSeeds from '../data/mapSeeds';
import { getAllPics } from '../utils/api';
import env from 'react-dotenv';

import MarkerInfoCard from './MarkerInfoCard'

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Map Container Styling
const containerStyle = {
    width: '100vw',
    height: '100vh'
  };

const MapWrapper = () => {
    // Set Map State
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [markers, setMarkers] = useState("");

    const onLoad = useCallback((map) => setMap(map), []);

    // const markers = mapSeeds;

    useEffect(() => {
    
        const fetchPicData = async () => {
          try {
            const response = await fetch('/api/pics/', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                }
            });
            const json = await response.json();
            console.log(json);
            setMarkers(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchPicData();
    }, []);

    // Set Bounds of Map to contain Markers
    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            if (markers) {
                markers.map((marker) => {
                    bounds.extend({
                        lat: marker.lat,
                        lng: marker.lng
                    });
                });
            map.fitBounds(bounds);
            };
        };
    }, [map, markers]);

    // Handle Active Marker change
    const handleActiveMarker = (markerId) => {
        setActiveMarker(markerId) 
    };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap 
                zoom={4.5}
                mapContainerStyle={containerStyle}
                onLoad={onLoad} 
                >
                {markers && (markers.map((marker) => (
                    <Marker 
                        key={marker.id}
                        position={{lat: marker.lat, lng: marker.lng}}
                        onMouseOver={() => handleActiveMarker(marker.id)}
                        onMouseOut={() => handleActiveMarker(null)}
                    >
                        {activeMarker === marker.id && (
                            <InfoWindow key={marker.id} position={marker.position} >
                                <MarkerInfoCard marker={marker} />
                            </InfoWindow>
                        )}
                    </Marker>
                )))}
            </GoogleMap>
        </LoadScript>
    )
};

export default MapWrapper;



