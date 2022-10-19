const express = require("express");
const apiRoutes = require("./api/index.js");
const router = express.Router();
const path = require("path");

router.use("/api", apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
