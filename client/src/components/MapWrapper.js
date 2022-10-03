import React, { useCallback, useEffect, useState } from 'react';
// import { Wrapper, Status, Spinner, ErrorCompnent } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import mapSeeds from '../data/mapSeeds';

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

    const onLoad = useCallback((map) => setMap(map), []);

    const markers = mapSeeds;

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
    }, [map, markers])

    const handleMouseOver = () => {

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
                    <MarkerF 
                        key={marker.id} 
                        position={marker.position}
                        // label={marker.title}
                        tooltip={marker.title}
                        onMouseOver={() => handleMouseOver(marker.title)}

                    >
                        {/* <Info */}
                    </MarkerF>
                ))}
            </GoogleMap>
        </LoadScript>
        )
};


export default MapWrapper;



