import fs from 'fs';
import path from 'path';

// EXIF data package
import exifr from "exifr";

// File Path variables
const moveFrom = './raw-photos';
const moveTo = './parsed-photos';

(async () => {
    try {
        const rawPhotos = await fs.promises.readdir(moveFrom);

        const photoData = [{}];
        
        for (const photo of rawPhotos) {
            // Get file paths
            const fromPath = path.join(moveFrom, photo);
            const toPath = path.join(moveTo, photo);

            // Get GPS data from photo
            const exifData = await exifr.gps(photo);
            photoData.push(exifData);
            console.log(photoData);


        }

    }
}
