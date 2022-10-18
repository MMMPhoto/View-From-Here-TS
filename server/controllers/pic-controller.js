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
        return res.json(addPicture);    } catch(err) {
      console.error(err);
    };
    // console.log(req.files);
    // Picture.create(req.body)
    //   .then((dbUsersData) => res.json(dbUsersData))
    //   .catch((err) => res.status(500).json(err));
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
