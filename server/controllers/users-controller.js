const { User, Picture } = require("../models/");
const { signToken } = require("../utils/auth.js");
const { newUserEmail, passwordResetEmail } = require("../utils/sendgrid.js");

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
        .json({ statusMessage: "Cannot find a user with this id!" });
    }

    res.json(foundUser);
  },

  async getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ statusMessage: "No user found with that ID" });
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
    const userExists = await User.findOne({$or: [{userName: req.body.userName},{email: req.body.email}]});
    if (userExists) {
      if (userExists.userName === req.body.userName) {
        res.statusMessage = "User Name already exists!";
      } else if (userExists.email === req.body.email) {
        res.statusMessage = "User with that Email already exists!";
      };      
      return res.status(400).end();
    };
    const user = await User.create(req.body);
    if (!user) return res.status(500).json(err);
    await newUserEmail(user.email);
    const token = signToken(user);
    return res.json({ token, user });
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
    }).populate({
      path: "savedPics",
      options: { strictPopulate: false },
    });
    if (!user) {
      res.statusMessage = "No user found with that email!"
      return res.status(400).end();
    }

    const correctPw = await user.isCorrectPassword(body.password);
    if (!correctPw) {
      res.statusMessage = "Incorrect Password!"
      return res.status(400).end();
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async recoverPassword({ body }, res) {
    try {
      const user = await User.findOne({email: body.email});
      if (!user) {
        res.statusMessage = "No user found with that email!"
        return res.status(404).end();
      } else {
        const resetCode = await user.generatePasswordReset();
        user.save();
        await passwordResetEmail(body.email, resetCode);
        res.statusMessage = "Check your email for a link to reset your password."
        return res.status(200).end();
      };
    } catch(err) {
      console.log(err);
      return res.json(err);
    };
  },

  async checkPasswordCode({ body }, res) {
    try {
      const validCode = await User.findOne(
        {resetPasswordToken: body.code, resetPasswordExpires: {$gt: Date.now()}}
      );
      if (!validCode) {
        res.statusMessage = "Your code is invalid or expired!"
        return res.status(404).end();
      } else {
        return res.status(200).end();
      };
    } catch(err) {
      console.log(err);
      return res.json(err);
    };
  },

  async changePassword({ body }, res) {
    try {
      const user = await User.findOne(
        {resetPasswordToken: body.code, resetPasswordExpires: {$gt: Date.now()}}
      );
      if (!user) {
        res.statusMessage = "Your code is invalid or expired!"
        return res.status(404).end();
      } else {
        user.password = body.newPassword;
        await user.save();
        res.statusMessage = "Your password has been changed!"
        return res.status(200).end();
      };
    } catch(err) {
      console.log(err);
      return res.json(err);
    };
  },

  async savePic({ user, body }, res) {
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
