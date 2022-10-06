import router from "express";

import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} from "../../controllers";

router.route("/".get(getAllUsers).post(createNewUser));

router.route("/id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
