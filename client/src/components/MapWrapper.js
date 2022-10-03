import React, { useState } from 'react';
// import { Wrapper, Status, Spinner, ErrorCompnent } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, useLoadScript, Marker } from "@react-google-maps/api";
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

const containerStyle = {
    width: '90vw',
    height: '90vh'
  };

const MapWrapper = () => {
    // const isLoaded = useLoadScript({
        
    // });
        return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap 
                zoom={10} 
                center={mapSeeds[0].position}
                mapContainerStyle={containerStyle}
                >
                {mapSeeds.map((seed, index) => (
                     <Marker position={ seed.position }></Marker>
                ))};
            </GoogleMap>
        </LoadScript>
        )
};


export default MapWrapper;



