import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapSeeds from '../data/mapSeeds';

import MapInfoWindow from './MapInfoWindow';

const apiKey = '';

// Map Container Styling
const containerStyle = {
    width: '90vw',
    height: '90vh'
  };

const MapWrapper = () => {
    // Set Map State
    const [map, setMap] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);

    const onLoad = useCallback((map) => setMap(map), []);

    const markers = mapSeeds;

    // Set Bounds of Map to contain Markers
    useEffect(() => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            markers.map((marker) => {
                bounds.extend({
                    lat: marker.position.lat,
                    lng: marker.position.lng
                });
            });
            map.fitBounds(bounds);
        };
    }, [map, markers]);

    // Handle Active Marker change
    const handleActiveMarker = (markerId) => {
        setActiveMarker(markerId) 
    };

        return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap 
                zoom={10}
                mapContainerStyle={containerStyle}
                onLoad={onLoad} 
                >
                {markers.map((marker) => (
                    <Marker 
                        key={marker.id} I
                        position={marker.position}
                        onClick={() => handleActiveMarker(marker.id)}
                    >
                        {activeMarker === marker.id && (
                            <InfoWindow key={marker.id} position={marker.position} >
                                <h6>{marker.title}</h6>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>
        </LoadScript>
        )
};


export default MapWrapper;



