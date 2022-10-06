import router from "express";

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers");

router.route("/".get(getAllUsers).post(createNewUser));

router.route("/id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
