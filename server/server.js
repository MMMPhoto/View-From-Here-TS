const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes/index.js");

// Photo Upload functions
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const { getGpsData, getCustomExifData, exifOptions } = require('./utils/exifr');
const { uploadImage, uploadOptions } = require('./utils/cloudinary');
const { Picture } = require("./models/index.js");
const fs = require('fs');

// const __dirname = fileURLToPath(const.meta.url);
// const { fileURLToPath } = require("url");
// const "dotenv/config";
// const { Router } = require"express";

// const route = routes;

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/pics", upload.single('userFile'), async function (req, res, next) {
  try {
    console.log(req.file.filename);
    const filePath = path.join(`./uploads/${req.file.filename}`);
    const gpsData = await getGpsData(filePath);
    console.log(gpsData);
    const exifData = await getCustomExifData(filePath, exifOptions);
    console.log(exifData);
    const uploadPhotoData = await uploadImage(filePath, uploadOptions);
    console.log(uploadPhotoData);

       // Get unique cloudinary photo ID
       const photoUrl = uploadPhotoData.secure_url;
       const publicId = uploadPhotoData.public_id;
 
       // Build object for database
       const photoData = {
         ...gpsData,
         ...exifData,
       };
       photoData.url = photoUrl;
       photoData.public_id = publicId;
       console.log(photoData);

  
      const addPicture = await Picture.create({
      lat: photoData.latitude,
      lng: photoData.longitude,
      url: photoData.url,
      public_id: photoData.public_id,
      createdAt: photoData.CreateDate,
      offsetTime: photoData.OffsetTime,
      tags: photoData.tags
      });
      console.log(addPicture);
      fs.unlinkSync(filePath);     
      return res.json(addPicture);





  } catch (err) {
    console.error(err);
  };
});

// app.use(Router);
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
