const express = require("express");
const router = express.Router();
const logger = require("../../utils/logger");
const { HTML_STATUS_CODE } = require("../../utils/constant");
const {
  addZones,
  getZones,
  updateZones,
  deleteZones,
} = require("../services/zoneServices");
const {
  addDepartment,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../services/departmentServices");
const {
  addMachine,
  getMachine,
  updateMachine,
  deleteMachine,
} = require("../services/machineServices");
const {
  addPlant,
  getPlant,
  updatePlant,
  deletePlant,
} = require("../services/plantServices");
const {
  addRole,
  getRole,
  updateRole,
  deleteRole,
} = require("../services/roleServices");
const {
  addShift,
  getShift,
  updateShift,
  deleteShift,
} = require("../services/shiftServices");
const {
  getUser,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../services/masteruserServices");
const {
  addCycleTime,
  getCycleTime,
  updateCycleTime,
  deleteCycleTime,
  getExcel,
} = require("../services/cycleTimeServices");
const { getPages } = require("../services/pagesService");
const {
  addApprovalStatus,
  getApprovalStatus,
  updateApprovalStatus,
} = require("../services/approvalStatusService");
const {
  addTooltip,
  getTooltip,
  updateTooltip,
  deleteTooltip,
} = require("../services/toolTipServices");
const { getOperationProcess } = require("../services/operationProcessService");
router.post("/zone", (req, res) => {
  addZones(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/zone", (req, res) => {
  getZones(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/zone/:_id", (req, res) => {
  updateZones(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/zone/:_id", (req, res) => {
  deleteZones(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/department", (req, res) => {
  addDepartment(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/department", (req, res) => {
  getDepartment(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/department/:_id", (req, res) => {
  updateDepartment(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/department/:_id", (req, res) => {
  deleteDepartment(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/machine", (req, res) => {
  addMachine(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/machine", (req, res) => {
  getMachine(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/machine/:_id", (req, res) => {
  updateMachine(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/machine/:_id", (req, res) => {
  deleteMachine(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/plant", (req, res) => {
  addPlant(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/plant", (req, res) => {
  getPlant(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/plant/:_id", (req, res) => {
  updatePlant(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/plant/:_id", (req, res) => {
  deletePlant(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/shift", (req, res) => {
  addShift(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/shift", (req, res) => {
  getShift(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/shift/:_id", (req, res) => {
  updateShift(req.params, req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/shift/:_id", (req, res) => {
  deleteShift(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/role", (req, res) => {
  addRole(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/role", (req, res) => {
  getRole(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/role/:_id", (req, res) => {
  updateRole(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/role/:_id", (req, res) => {
  deleteRole(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/user", (req, res) => {
  addUser(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/user", (req, res) => {
  getUser(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/user/:id", (req, res) => {
  updateUser(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/user/:id", (req, res) => {
  deleteUser(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/user/:id", (req, res) => {
  getUserById(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/cycletime", (req, res) => {
  addCycleTime(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/cycletime", (req, res) => {
  getCycleTime(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/cycletime/:partId", (req, res) => {
  updateCycleTime(req.params, req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/cycletime/:partId", (req, res) => {
  deleteCycleTime(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/excelUploads", (req, res) => {
  getExcel(req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.BAD_REQUEST).json(error);
    });
});
router.get("/getpages", (req, res) => {
  getPages()
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/approval", (req, res) => {
  addApprovalStatus(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/approval", (req, res) => {
  getApprovalStatus(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/approval", (req, res) => {
  updateApprovalStatus(req)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.post("/tooltip", (req, res) => {
  addTooltip(req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/tooltip", (req, res) => {
  getTooltip(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.put("/tooltip", (req, res) => {
  updateTooltip(req.body)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.delete("/tooltip/:masterName", (req, res) => {
  deleteTooltip(req.params)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res.status(error.status || HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});
router.get("/operationProcess", (req, res) => {
  getOperationProcess(req.query)
    .then((result) => {
      res.status(HTML_STATUS_CODE.SUCCESS).json(result);
    })
    .catch((error) => {
      res
        .status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR)
        .json(error);
    });
});
module.exports = router;
