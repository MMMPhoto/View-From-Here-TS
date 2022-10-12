import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePic } from '../utils/api';
import { Link } from 'react-router-dom';
import MapWrapper from '../components/MapWrapper';
import './SingleView.css';

const SingleView = () => {
    const { pictureId } = useParams();
    const [pictureData, setPictureData] = useState([{}]);
    const [picUrl, setPicUrl] = useState("");

    // Map Container Styling
    const containerStyle = {
        width: '60vh',
        height: '60vh'
    };

    useEffect(() => {
        const getPicData = async () => {
            try {
                const response = await getOnePic(pictureId);
                const jsonData = await response.json();
                let jsonArray = [];
                jsonArray.push(jsonData);
                setPictureData(jsonArray);
                let url = jsonData.url;
                url = url.replace('heic', 'jpg');
                setPicUrl(url);
            } catch (error) {
                console.log("error", error);
            };
        };
        getPicData();
    }, []);
    
    return (
        <>
            <Link to="/"><h5>&#60; Go back to Map</h5></Link>
            <div className='d-flex flex-column align-items-center p-4'>
                <img className='single-pic p-4' src={picUrl} />
                <div>
                    { pictureData[0].lat ? (<MapWrapper markers={pictureData} containerStyle={containerStyle} />) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    )
};

export default SingleView;


