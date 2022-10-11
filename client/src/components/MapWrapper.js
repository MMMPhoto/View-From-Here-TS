import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import { Link } from 'react-router-dom';
import { getAllPics } from '../utils/api';

import MarkerInfoCard from './MarkerInfoCard';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Map Container Styling
const containerStyle = {
    width: '100vw',
    height: '100vh'
  };

const MapWrapper = ({markers}) => {
    const navigate = useNavigate();

    // Set Map State
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    const onLoad = useCallback((map) => setMap(map), []);

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
                if (markers.length === 1) {
                    map.setCenter(bounds.getCenter());
                    map.setZoom(12);
                } else {
                    map.fitBounds(bounds);        
                }
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
                            onMouseOut={() => {
                                setTimeout(() => {
                                    handleActiveMarker(null);
                                }, 1500);
                            }}
                            onClick={() => navigate(`/single-view/${marker.id}`)}
                        >

                            {activeMarker === marker.id && (
                                <InfoWindow key={marker.id} position={marker.position} >
                                    <MarkerInfoCard marker={marker} navigate={navigate} />
                                </InfoWindow>
                            )}
                        </Marker>
                )))}
            </GoogleMap>
        </LoadScript>
    )
};

export default MapWrapper;



