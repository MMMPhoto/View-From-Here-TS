const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const picRoutes = require("./picRoutes.js");

router.use("/users", userRoutes);
router.use("/pics", picRoutes);

module.exports = router;
