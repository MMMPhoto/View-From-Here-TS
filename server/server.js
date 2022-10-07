import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(import.meta.url);

import db from "./config/connection.js";
import "dotenv/config";
import { Router } from "express";
import routes from "./routes/index.js";
const route = routes;

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/src/index.html"));
});

app.use(Router);

db.once("open", () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
