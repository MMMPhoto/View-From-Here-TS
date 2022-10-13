import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePic } from '../utils/api';
import { GrFavorite } from 'react-icons/gr';
import MapWrapper from '../components/MapWrapper';
import './SingleView.css';

const SingleView = () => {
    const { pictureId } = useParams();
    const [pictureData, setPictureData] = useState([{}]);
    const [picUrl, setPicUrl] = useState("");

    // Set state for saved photo
    const [isSavedPhoto, setSavedPhoto] = useState(false);

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

      // Handle save photo
      const handleSavePhoto = () => {
        // To Do: Add work to save to user's saved photos in database
        setSavedPhoto(true);
    };
    
    return (
        <div className='d-flex flex-column align-items-center p-4'>
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <h3><GrFavorite onClick={(() => handleSavePhoto())}/></h3>
                { isSavedPhoto ? (<p className="ms-3 mb-0">Photo saved!</p>) : (<></>)}
            </div>
            <img className='single-pic p-4' src={picUrl} />
            <div>
                { pictureData[0].lat ? (<MapWrapper markers={pictureData} containerStyle={containerStyle} />) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
};

export default SingleView;


