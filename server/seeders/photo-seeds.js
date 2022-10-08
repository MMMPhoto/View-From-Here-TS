import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { uploadImage, getAssetInfo, createImageTag, uploadOptions } from '../utils/cloudinary.js';
import { getGpsData, getCustomExifData, exifOptions } from '../utils/exifr.js';
import { Picture } from "../models/index.js";

import db from "../config/connection.js";


// File Path variables
const moveFrom = './seeders/rawPhotos';
const moveTo = './seeders/parsed-photos/.';

const rawPhotos = fs.readdirSync(moveFrom);

const seedFunction = async () => {
    try {
        
        console.log(rawPhotos);

        const photoDataArray = [];
        let i = 1;
        
        for (const photo of rawPhotos) {
            // Get file paths
            const fromPath = path.join(moveFrom, photo);
            const toPath = path.join(moveTo, photo);

            // Get GPS data from photo
            const gpsData = await getGpsData(fromPath);
            console.log(gpsData);

            // Get custom Exif data
            const exifData = await getCustomExifData(fromPath, exifOptions);
            console.log(exifData);

            // Upload image to Cloudinary
            const uploadPhotoData = await uploadImage(fromPath, uploadOptions);
            console.log(uploadPhotoData)

            // Get unique photo URL
            const photoUrl = uploadPhotoData.secure_url;

            // Build object for database
            const photoData = {
                ...gpsData,
                ...exifData
            };
            photoData.url = photoUrl;

            console.log(photoData);

            // Database model insert
            const addPicture = async (req, res) => {
                Picture.create({
                    lat: req.latitude,
                    lng: req.longitude,
                    url: req.url
                })
                .then((res) => res.json(res))
                .catch((err) => {
                    console.error({message: err})
                });
            };

            addPicture(photoData);
            
            // Write photos to new location so we know they have been processed
            await fsPromises.rename(fromPath, toPath);
            console.log('Wrote file');
        }
        // Write GPS data to JSON file
        const jsonData = JSON.stringify(photoDataArray);
        fs.writeFile('./seeders/json-photo-data.json', jsonData, 'utf8', (err, data) => {
            err ? console.err(err) : console.log('File written!');
        });

    } catch (error) {
        console.error(error);
    }
};

db.once('open', async () => {
    try {
        seedFunction();
    } catch (err) {
      throw err;
    }
  });


