const logger = require("../../utils/logger");
const digital = require("../../app/modelsdigitalization/db");
const sfs_Db = require('../modelskavia/db')

async function serverInit() {
  logger.debug("Server Initialized");
  await digital.dbInit();
  await sfs_Db.dbInit();
}
exports.serverinit = serverInit;
