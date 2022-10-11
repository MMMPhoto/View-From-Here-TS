import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePic } from '../utils/api';
import MapWrapper from '../components/MapWrapper';
import './SingleView.css';

const SingleView = () => {
    const { pictureId } = useParams();
    const [pictureData, setPictureData] = useState([{}]);
    const [picUrl, setPicUrl] = useState("");

    useEffect(() => {
        const getPicData = async () => {
            try {
                console.log(pictureId)
                const response = await getOnePic(pictureId);
                const jsonData = await response.json();
                console.log(jsonData);
                let jsonArray = [];
                jsonArray.push(jsonData);
                setPictureData(jsonArray);
                let url = jsonData.url;
                url = url.replace('heic', 'jpg');
                setPicUrl(url);
                console.log(picUrl);            
            } catch (error) {
                console.log("error", error);
            };
        };
        getPicData();
    }, []);
    
    return (
        <div className='d-flex flex-column align-items-center p-4'>
            <img className='single-pic' src={picUrl} />
            <div>
                { pictureData[0].lat ? (<MapWrapper markers={pictureData} />) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
};

export default SingleView;


