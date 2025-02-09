const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const { HTML_STATUS_CODE } = require("../../utils/constant");
const multer = require("multer");
const path = require("path");
const {
  addtempChecklist,
  gettempChecklist,
  updatetempChecklist,
  deletetempChecklist,
  gettempChecklistbyId,
} = require("../services/tempChecklistServices");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(path.join(process.cwd(), "/upload")));
  },
  filename: (req, file, cb) => {
    logger.debug(req);
    let fileName = `${
      file.originalname.split(".")[0]
    }_${new Date().getTime()}.${file.originalname.split(".")[1]}`;
    cb(null, fileName);
    req.body["fileName"] = fileName;
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".pdf" && ext !== ".png" && ext !== ".jpg") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/uploadPdf", upload.single("file"), (req, res) => {
  res
    .status(200)
    .json(`http://${req.headers.host}/uploads/${req.body.fileName}`);
});

router.post("/template", (req, res) => {
  addtempChecklist(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/template", (req, res) => {
  gettempChecklist(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/template/:Tempname", (req, res) => {
  updatetempChecklist(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/template/:Tempname", (req, res) => {
  deletetempChecklist(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/template/:Tempname", (req, res) => {
  gettempChecklistbyId(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

module.exports = router;
