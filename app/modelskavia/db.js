"use strict";
const logger = require("../../utils/logger");
const mongoose = require("mongoose");
const {databaseKavia} = require("../../utils/constant");
const autoIncrement = require("mongoose-auto-increment");
const _ = require("lodash");

/*
 * add admin user
 */

async function dbInit() {
  try {
    let db = mongoose.connection;
    mongoose.connect(
      `mongodb://${databaseKavia.host}:${databaseKavia.port}/${databaseKavia.db}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    let timer = setInterval(() => {
      mongoose.connect(
        `mongodb://${databaseKavia.host}:${databaseKavia.port}/${databaseKavia.db}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      autoIncrement.initialize(db);
    }, 10000);
    db.on("open", async function () {
      clearInterval(timer);
      logger.debug("SFS Database is connected...");
    //   await checkAdmin();
    });

    db.on("error", function (err) {
      logger.debug(err);
      logger.debug("SFS Database connection error ...");
      setTimeout(() => {
        dbInit();
      }, 20000);
    });
  } catch (err) {
    logger.error(err);
    setTimeout(() => {
      dbInit();
    }, 20000);
  }
}

exports.dbInit = dbInit;
