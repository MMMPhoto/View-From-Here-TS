import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

// EXIF data package
import exifr from "exifr";

// File Path variables
const moveFrom = './seeders/rawPhotos';
const moveTo = './seeders/parsed-photos/.';

const rawPhotos = fs.readdirSync(moveFrom);

const seedFunction = async () => {
    try {
        
        console.log(rawPhotos);

        const photoData = [{}];
        let i = 1;
        
        for (const photo of rawPhotos) {
            // Get file paths
            const fromPath = path.join(moveFrom, photo);
            const toPath = path.join(moveTo, photo);

            // Get GPS data from photo
            const exifData = await exifr.gps(`${moveFrom}/${photo}`);
            exifData.id = i;
            i = i++;
            // Add photo data to array
            photoData.push(exifData);
            console.log(photoData);

            // Write new file
            await fsPromises.rename(`${moveFrom}/${photo}`, `${moveTo}/${photo}`);
            console.log('Wrote file');
        }
    } catch (error) {
        console.error(error);
    }
};

seedFunction();