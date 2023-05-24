const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  login,
  savePic,
  deleteSavedPic,
  getCurrentUser,
  recoverPassword,
  checkPasswordCode,
  changePassword
} = require("../../controllers/users-controller.js");

const { authMiddleware } = require("../../utils/auth.js");

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .put(authMiddleware, savePic);

router.route("/login").post(login);

router.route("/recover").put(recoverPassword);

router.route("/check-code").post(checkPasswordCode);

router.route("/change-password").put(changePassword);

router.route("/me").get(authMiddleware, getCurrentUser);

router.route("/me/:id").get(getUserById);

router.route("/pics/:picId").delete(authMiddleware, deleteSavedPic);

router.route("/:id").put(updateUser).delete(authMiddleware, deleteUser);

module.exports = router;
