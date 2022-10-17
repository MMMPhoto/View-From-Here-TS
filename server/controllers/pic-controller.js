const { User, Picture } = require("../models/index");

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

  async createNewPic(req, res) {
    console.log(req.files);
    Picture.create(req.body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(500).json(err));
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
