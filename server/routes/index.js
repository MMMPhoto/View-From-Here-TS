import router from "express";
import apiRoutes from "/api";

router.request("/api", apiRoutes);

router.request((req, res) => {
  return res.send("Your route sucks and you should feel bad about yourself.");
});

module.exports = router;
