const { User, Picture } = require("../models/index");
const path = require("path");
const { getGpsData, getCustomExifData, exifOptions } = require('../utils/exifr');
const { uploadImage, uploadOptions } = require('../utils/cloudinary');
const fs = require('fs');

module.exports = {
  async getAllPics(req, res) {
    Picture.find({})
      .select("-__v")
      .then((dbPictureData) => res.json(dbPictureData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },

  async getPicById({ params }, res) {
    Picture.findOne({ _id: params.id })
      .select("-__v")
      .then((dbPictureData) => {
        if (!dbPictureData) {
          res.status(404).json({ message: "No picture found with that id." });
          return;
        }
        res.json(dbPictureData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  async createNewPic(req, res, next) {
    try {
      // Define path of uploaded picture
      const filePath = path.join(`./uploads/${req.file.filename}`);
      // Get GPS and Exif data from picture
      const gpsData = await getGpsData(filePath);
      const exifData = await getCustomExifData(filePath, exifOptions);
      // Upload to Cloudinary
      const uploadPhotoData = await uploadImage(filePath, uploadOptions);  
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
      // Add Photo Data to Database
      const addPicture = await Picture.create({
      lat: photoData.latitude,
      lng: photoData.longitude,
      url: photoData.url,
      public_id: photoData.public_id,
      createdAt: photoData.CreateDate,
      offsetTime: photoData.OffsetTime,
      tags: photoData.tags
      });
      // Delete
      if (addPicture) {
        fs.unlinkSync(filePath);     
        return res.json(addPicture);
      } else {
        return res.json('Something went wrong!');
      };
    } catch(err) {
      console.error(err);
    };
  },

  async updatePic({ params, body }, res) {
    Picture.findByIdAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPictureData) => {
        if (!dbPictureData) {
          res.status(404).json({ message: "No picture found with that id." });
          return;
        }
        res.json(dbPictureData);
      })
      .catch((err) => {
        console.log((err) => {
          console.log(err);
          res.sendStatus(404);
        });
      });
  },

  async deletePic({ params }, res) {
    Picture.findOneAndDelete({ _id: params.id }, { new: true })
      .then((dbPictureData) => {
        if (!dbPictureData) {
          res.status(404).json({ message: "No picture found with that id." });
          return;
        }
        res.json({ message: "Picture deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
// export { getAllPics, getPicById, createNewPic, updatePic, deletePic };
