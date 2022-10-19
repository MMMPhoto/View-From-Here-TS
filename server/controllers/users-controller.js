const { User, Picture } = require("../models/");
const { signToken } = require("../utils/auth.js");

module.exports = {
  async getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },

  async getCurrentUser({ user = null, params }, res) {
    const foundUser = await User.findOne({ _id: user._id }).populate({
      path: "savedPics",
      options: { strictPopulate: false },
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json(foundUser);
  },

  async getUserById({ params }, res) {
    User.findOne({ _id: params.id })
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
  },

  async createNewUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  async updateUser({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
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
  },

  async deleteUser({ params }, res) {
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
  },

  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ email: body.email }, { password: body.password }],
    });
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async savePic({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { $push: { savedPics: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteSavedPic({ user, params }, res) {
    console.log(user);
    console.log(params);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedPics: { $in: [params.picId] } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find a user or pic with that id!" });
    }
    return res.json(updatedUser);
  },
};
