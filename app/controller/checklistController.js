const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const { HTML_STATUS_CODE } = require("../../utils/constant");
const {
  addlist,
  getlist,
  updatelist,
  deletelist,
  getlistbyId,
} = require("../services/checklistServices");
const {
  addDragDrop,
  getDragDrop,
  updateDrag,
} = require("../services/dragdropServices");

router.post("/drag", (req, res) => {
  addDragDrop(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/drag", (req, res) => {
  getDragDrop(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/drag/:masterName", (req, res) => {
  updateDrag(req.params, req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

router.post("/list", (req, res) => {
  addlist(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/list", (req, res) => {
  getlist(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/list/:checklistName", (req, res) => {
  updatelist(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/list/:checklistName", (req, res) => {
  deletelist(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/list/:checklistName", (req, res) => {
  getlistbyId(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

module.exports = router;
