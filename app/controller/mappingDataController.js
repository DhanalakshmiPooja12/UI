const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const { HTML_STATUS_CODE } = require("../../utils/constant");
const {
  addMapping,
  getMapping,
  updateMapping,
  deleteMapping,
} = require("../services/mappingServices");

router.post("/map", (req, res) => {
  addMapping(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/map", (req, res) => {
  getMapping(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/map/:_id", (req, res) => {
  updateMapping(req.params,req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/map/:_id", (req, res) => {
  deleteMapping(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

module.exports = router;
