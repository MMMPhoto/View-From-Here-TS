import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import './MarkerInfoCard.css';

const MarkerInfoCard = ({marker}) => {
    return (
        <div className='info-div'>
            <h6>{marker.title}</h6>
            <img className="marker-thumb" src={marker.url} />
        </div>
       
    )
};


export default MarkerInfoCard;