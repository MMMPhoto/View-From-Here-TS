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

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .put(authMiddleware, savePic);

router.route("/login").post(login);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/pics/:picId").delete(authMiddleware, deleteSavedPic);

export default router;
