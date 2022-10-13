import express from "express";
import apiRoutes from "./api/index.js";
const router = express.Router();

router.use("/api", apiRoutes);

// router.use((req, res) => {
//   return res.send("Your route sucks and you should feel bad about yourself.");
// });

// // serve up react front-end in production
// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

export default router;