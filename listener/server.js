const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyparser.json());
const isAuthenticate = require("../app/middleware/authenticateServices")

app.use(
  bodyparser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 500000,
  })
);

let customCors = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
};
app.use(customCors);

app.use("/uploads", express.static(path.join(__dirname, "../upload")));

app.use("/auth", require("../app/controller/authController"));
app.use("/config",isAuthenticate, require("../app/controller/configController"));
app.use("/checklist",isAuthenticate, require("../app/controller/templateController"));
app.use("/imageData",isAuthenticate, require("../app/controller/imageDataController"));
app.use("/mappingData", isAuthenticate,require("../app/controller/mappingDataController"));
app.use("/masterData",isAuthenticate, require("../app/controller/masterDataController"));
app.use("/fillChecklist",isAuthenticate, require("../app/controller/checklistController"));

module.exports = app;
