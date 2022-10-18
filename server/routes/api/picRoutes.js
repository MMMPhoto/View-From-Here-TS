const router = require("express").Router();
const { ProvidedRequiredArgumentsOnDirectivesRule } = require("graphql/validation/rules/ProvidedRequiredArgumentsRule.js");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  getAllPics,
  getPicById,
  createNewPic,
  updatePic,
  deletePic,
} = require("../../controllers/pic-controller.js");

console.log(upload);

router.route("/").get(getAllPics);

router.post("/", upload.single('userFile'), createNewPic);

router.route("/:id").get(getPicById).put(updatePic).delete(deletePic);

module.exports = router;
