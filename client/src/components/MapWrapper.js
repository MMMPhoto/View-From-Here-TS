import React, { useState } from 'react';
// import { Wrapper, Status, Spinner, ErrorCompnent } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, useLoadScript, Marker } from "@react-google-maps/api"; 

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

const apiKey = 'mykey';

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
                center={{lat: 30, lng: -90}}
                mapContainerStyle={containerStyle}
                >
            </GoogleMap>
        </LoadScript>
        )
};


export default MapWrapper;



