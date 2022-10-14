const router = require("express").Router();
const userRoutes = require("./userRoutes");
const picRoutes = require("./picRoutes");

router.use("/users", userRoutes);
router.use("/pics", picRoutes);

module.exports = router;
