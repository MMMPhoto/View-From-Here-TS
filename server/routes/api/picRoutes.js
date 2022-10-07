import express from "express";
const router = express.Router();

import {
  getAllPics,
  getPicById,
  createNewPic,
  updatePic,
  deletePic,
} from "../../controllers/pic-controller.js";

router.route("/").get(getAllPics).post(createNewPic);

router.route("/:id").get(getPicById).put(updatePic).delete(deletePic);

export default router;
