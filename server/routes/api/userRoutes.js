import { authMiddleware } from "../../utils/auth.js";
import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  login,
  savePic,
  deleteSavedPic,
} from "../../controllers/users-controller.js";

router.route("/").get(getAllUsers).post(createNewUser).put(savePic);

router.route("/login").post(login);

router.route("/:id").put(updateUser).delete(deleteUser);

router.route("/me/:id").get(getUserById);

router.route("/pics/:picId").delete(authMiddleware, deleteSavedPic);

export default router;
