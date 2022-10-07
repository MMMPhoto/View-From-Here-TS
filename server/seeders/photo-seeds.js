import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { uploadImage, getAssetInfo, createImageTag } from '../utils/cloudinary.js';

// EXIF data package
import exifr from "exifr";

// File Path variables
const moveFrom = './seeders/rawPhotos';
const moveTo = './seeders/parsed-photos/.';

const rawPhotos = fs.readdirSync(moveFrom);

const seedFunction = async () => {
    try {
        
        console.log(rawPhotos);

        const photoData = [];
        let i = 1;
        
        for (const photo of rawPhotos) {
            // Get file paths
            const fromPath = path.join(moveFrom, photo);
            const toPath = path.join(moveTo, photo);

            // Get GPS data from photo
            const exifData = await exifr.gps(`${moveFrom}/${photo}`);
            exifData.id = i++;
            // Add photo data to array
            photoData.push(exifData);
            console.log(photoData);

            // Upload image to Cloudinary
            const uploadId = await uploadImage(`${moveFrom}/${photo}`);
            console.log(`Photo ${uploadId} written to Cloud`);
            
            // Write photos to new location
            await fsPromises.rename(`${moveFrom}/${photo}`, `${moveTo}/${photo}`);
            console.log('Wrote file');
        }
        // Write GPS data to JSON file
        const jsonData = JSON.stringify(photoData);
        fs.writeFile('./seeders/json-photo-data.json', jsonData, 'utf8', (err, data) => {
            err ? console.err(err) : console.log('File written!');
        });

    } catch (error) {
        console.error(error);
    }
};

seedFunction();