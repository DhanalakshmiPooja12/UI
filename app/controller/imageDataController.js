const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const { HTML_STATUS_CODE } = require("../../utils/constant");
const {addImage,getImage,updateImage}=require("../services/imageServices");

router.post("/image", (req, res) => {
    addImage(req)
      .then((result) => {
        res.status(HTML_STATUS_CODE.SUCCESS).json(result);
      })
      .catch((error) => {
        res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
      });
  });
  router.get("/image", (req, res) => {
    getImage(req.query)
      .then((result) => {
        res.status(HTML_STATUS_CODE.SUCCESS).json(result);
      })
      .catch((error) => {
        res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
      });
  });
  router.put("/image/:masterName", (req, res) => {
    updateImage(req.params)
      .then((result) => {
        res.status(HTML_STATUS_CODE.SUCCESS).json(result);
      })
      .catch((error) => {
        res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
      });
  });
 
  module.exports = router;