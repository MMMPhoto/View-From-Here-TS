const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes/index.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Production Build Check Middleware
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  });
  app.use(express.static(path.join(__dirname, "../client/build")));
};

// Other Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.use(Router);
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
