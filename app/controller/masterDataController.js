const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const { HTML_STATUS_CODE } = require("../../utils/constant");
const {
  addMaster,
  getMaster,
  updateMaster,
  deleteMaster,
  getMasterbyId,
} = require("../services/masterServices");

router.post("/master", (req, res) => {
  addMaster(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/master", (req, res) => {
  getMaster(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/master/:masterName", (req, res) => {
  updateMaster(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/master/:masterName", (req, res) => {
  deleteMaster(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/master/:masterName", (req, res) => {
  getMasterbyId(req.params.masterName)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

module.exports = router;
