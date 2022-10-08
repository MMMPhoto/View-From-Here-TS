import { User, Picture } from "../models/index.js";
import { signToken } from "../utils/auth.js";

const getAllUsers = async (req, res) => {
  User.find({})
    // .populate({ path: "Picture" })
    .select("-__v")
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.error({ message: err });
      return res.status(500).json(err);
    });
};

const getUserById = async ({ params }, res) => {
  User.findOne({ _id: params.id })
    // .populate({ path: "Picture" })
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

const login = async ({ body }, res) => {
  const user = await User.findOne({
    $or: [{ username: body.userName }, { email: body.email }],
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
};

const savePic = async ({ user, body }, res) => {
  console.log(user);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { id: user._id },
      { $push: { savedPic: body } },
      { new: true, runValidators: true }
    );
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

const deleteSavedPic = async ({ user, params }, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: user_id },
    { $oull: { savedPics: { picId: params.picId } } },
    { new: true }
  );
  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find a user or pic with that id!" });
  }
  return res.json(updatedUser);
};

export {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  login,
  savePic,
  deleteSavedPic,
};
