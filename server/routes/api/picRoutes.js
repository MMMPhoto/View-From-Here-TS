import router from "express";

import {
  getAllPics,
  getPicById,
  createNewPic,
  updatePic,
  deletePic,
} from "../../controllers/pic-controller";

router.route("/").get(getAllPics).post(createNewPic);

router.route("/:id").get(getPicById).put(updatePic).delete(deletePic);

module.exports = router;
