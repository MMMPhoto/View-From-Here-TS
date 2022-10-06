import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Wrapper, Status, Spinner, ErrorCompnent } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapSeeds from '../data/mapSeeds';

import MapInfoWindow from './MapInfoWindow';

// import Map from './Map';

// const render = (status) => {
//     switch (status) {
//         case Status.LOADING:
//             return <Spinner />;
//         case Status.FAILURE:
//             return <ErrorCompnent />;
//         default:
//             return <Map />;
//     }
// };

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
    const currentMarker = useRef(null);

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

    // const activateMarker = (marker) => {
    //     setActiveMarker(marker);
    // };

    useEffect(() => {
        currentMarker.current = activeMarker;
        console.log(currentMarker);

    }, [activeMarker]);

    const showInfoWindow = () => {
        if (currentMarker) {
            return (
                <InfoWindow key={currentMarker.current.marker.id} position={currentMarker.current.marker.position} >
                    <h6>{currentMarker.current.marker.title}</h6>
                </InfoWindow>
            );
        };   
    };


    // const isLoaded = useLoadScript({        
    // });
        return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap 
                zoom={10}
                // center={mapSeeds[0].position}
                mapContainerStyle={containerStyle}
                onLoad={onLoad} 
                >
                {markers.map((marker) => (
                    <Marker 
                        key={marker.id} I
                        position={marker.position}
                        onClick={() => setActiveMarker({marker})}
                        activeMarker={activeMarker}
                    >
                    </Marker>
                ))}
                { activeMarker && (
                    <InfoWindow key={currentMarker.current.id} position={currentMarker.current.position} >
                        <h6>{currentMarker.current.title}</h6>
                    </InfoWindow>
                )}
                {showInfoWindow()}
            </GoogleMap>
        </LoadScript>
        
        )
};


export default MapWrapper;



