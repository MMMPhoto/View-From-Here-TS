import { User, Picture } from "../models/index.js";

const getAllPics = async (req, res) => {
  Picture.find({})
    .select("-__v")
    .then((dbPictureData) => res.json(dbPictureData))
    .catch((err) => {
      console.error({ message: err });
      return res.status(500).json(err);
    });
};

const getPicById = async ({ params }, res) => {
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
};

const createNewPic = async (req, res) => {
  Picture.create(req.body)
    .then((dbUsersData) => res.json(dbUsersData))
    .catch((err) => res.status(500).json(err));
};

const updatePic = async ({ params, body }, res) => {
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
};

const deletePic = async ({ params }, res) => {
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
};

export { getAllPics, getPicById, createNewPic, updatePic, deletePic };
