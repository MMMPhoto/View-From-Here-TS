import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './MarkerInfoCard.css';

const MarkerInfoCard = ({marker}) => {

    let url = marker.url;
    console.log(url);
    url = url.replace('heic', 'jpg');
    console.log(url);

    return (
        <div className='info-div'>
            <h6>{marker.title}</h6>
            <img className="marker-thumb" src={url} />
        </div>
       
    )
};


export default MarkerInfoCard;