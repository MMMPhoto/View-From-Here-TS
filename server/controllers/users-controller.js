import { User, Picture } from "../models/index.js";

const getAllUsers = async (req, res) => {
  User.find({})
    .populate({ path: "Picture" })
    .select("-__v")
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.error({ message: err });
      return res.status(500).json(err);
    });
};

const getUserById = async ({ params }, res) => {
  User.findOne({ _id: params.id })
    .populate({ path: "Picture" })
    .select("-__v")
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with that ID" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};

const createNewUser = async (req, res) => {
  User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
};

const updateUser = ({ params, body }, res) => {
  User.findByIdAndUpdate({ _d: params.id }, body, { new: true })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with that ID" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};

const deleteUser = async ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id }, { new: true })
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with that ID" })
        : Picture.deleteMany({ _id: { $in: user.picture } })
    )
    .then(() =>
      res.json({ message: "User and associated pictures have been deleted" })
    )
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};

export { getAllUsers, getUserById, createNewUser, updateUser, deleteUser };
