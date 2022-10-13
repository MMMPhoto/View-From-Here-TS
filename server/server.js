const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes/index.js");
// const __dirname = fileURLToPath(const.meta.url);
// const { fileURLToPath } = require("url");
// const "dotenv/config";
// const { Router } = require"express";

// const route = routes;

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.use(Router);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
