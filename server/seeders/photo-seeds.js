import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

import { uploadImage, getAssetInfo, createImageTag } from '../utils/cloudinary.js';
import { getGpsData, getCustomExifData, exifOptions } from '../utils/exifr.js';

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
            const gpsData = await getGpsData(fromPath);
            console.log(gpsData);

            // Get custom Exif data
            const exifData = await getCustomExifData(fromPath, exifOptions);
            console.log(exifData);

            // Add photo data to array
            photoData.push(gpsData);
            photoData.push(exifData);
            console.log(photoData);
            photoData.id = i++;

            // Upload image to Cloudinary
            // const uploadId = await uploadImage(`${moveFrom}/${photo}`);
            // console.log(`Photo ${uploadId} written to Cloud`);
            
            // Write photos to new location so we know they have been processed
            await fsPromises.rename(fromPath, toPath);
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