const router = require("express").Router();

const {
  getAllPics,
  getPicById,
  createNewPic,
  updatePic,
  deletePic,
} = require("../../controllers/pic-controller.js");

router.route("/").get(getAllPics).post(createNewPic);

router.route("/:id").get(getPicById).put(updatePic).delete(deletePic);

module.exports = router;
