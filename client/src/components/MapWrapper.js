import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import MarkerInfoCard from './MarkerInfoCard';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MapWrapper = ({markers, containerStyle}) => {
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
                    return bounds.extend({
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
                mapTypeId="hybrid"
                >
                {markers && (markers.map((marker) => (
                        <Marker 
                            key={marker.id}
                            position={{lat: marker.lat, lng: marker.lng}}
                            onMouseOver={() => handleActiveMarker(marker.id)}
                            // onMouseOut={() => {
                            //     setTimeout(() => {
                            //         handleActiveMarker(null);
                            //     }, 1500);
                            // }}
                            onClick={() => navigate(`/single-view/${marker.id}`)}
                        >

                            {(activeMarker === marker.id && markers.length > 1) && (
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



