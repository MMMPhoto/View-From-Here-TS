import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './MarkerInfoCard.css';

const MarkerInfoCard = ({marker, navigate}) => {

    // Set url to lower resolution for thumbnail
    let urlArray  = marker.url.split("/");
    let url = `${urlArray[0]}/${urlArray[1]}/${urlArray[2]}/${urlArray[3]}/${urlArray[4]}/${urlArray[5]}/c_scale,w_150/${urlArray[6]}/${urlArray[7]}`;
    url = url.replace('heic', 'jpg');

    return (
        <div className='info-div' onClick={() => navigate(`/single-view/${marker.id}`)}>
            <h6>{marker.title}</h6>
            <img className="marker-thumb" src={url} />
        </div>
       
    )
};


export default MarkerInfoCard;