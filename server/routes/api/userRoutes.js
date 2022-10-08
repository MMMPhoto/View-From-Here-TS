import express from "express";
const router = express.Router();

import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} from "../../controllers/users-controller.js";

router.route("/").get(getAllUsers).post(createNewUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
