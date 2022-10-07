import userRoutes from "./userRoutes.js";
import picRoutes from "./picRoutes.js";
import express from "express";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/pics", picRoutes);

export default router;
