import React, { useState } from 'react';
import { Wrapper, Status, Spinner, ErrorCompnent } from "@googlemaps/react-wrapper";

import Map from './Map';

const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return <Spinner />;
        case Status.FAILURE:
            return <ErrorCompnent />;
        default:
            return <Map />;
    }
};

const MapWrapper = () => {
    return (
        <Wrapper apiKey={"YOUR_API_KEY"} render={render} />
    )
};

export default MapWrapper;



