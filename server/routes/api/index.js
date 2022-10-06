import router from "express";
import userRoutes from "./userRoutes";
import picRoutes from "./picRoutes";

router.use("/users", userRoutes);
router.use("/pics", picRoutes);

module.exports = router;
