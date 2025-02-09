"use strict";
const logger = require("../../utils/logger");
const mongoose = require("mongoose");
const Config = require("../../utils/constant");
const autoIncrement = require("mongoose-auto-increment");
const userDao = require("./dao/userDao");
const role = require("./dto/role");
const { addData } = require("./dao/commondao");

const _ = require("lodash");

/*
 * add admin user
 */
function addAdmin() {
  return new Promise(async function (resolve, reject) {
    try {
      /*
       * ADD USER ADMINISTARTOR
       */
      var user = {
        userName: "SUPERADMIN",
        password: "welcome",
        role: "SUPERADMIN",
        depart: "All",
        email: "administrator@wimerasys.com",
        mobileNumber: "9900990099",
        userId: 1,
      };

      resolve(await userDao.addUser(user));
      logger.debug("SUPERADMIN created");
    } catch (err) {
      reject(err);
    }
  });
}

async function checkAdmin() {
  return new Promise(async function (resolve, reject) {
    try {
      var adminQuery = {
        query: {
          userName: "SUPERADMIN",
        },
        fields: {
          userName: 1,
        },
        options: {
          limit: 1,
        },
      };

      let user = await userDao.getUserByFields(adminQuery);
      if (!_.isEmpty(user)) {
        logger.debug("SUPERADMIN user exists");
      } else {
        let addUser = await addAdmin();
      }
      let roleResult = await role.findOne({
        roleName: "SUPERADMIN",
      });
      if (!_.isEmpty(roleResult)) {
        logger.debug("SUPERADMIN Role exists");
      } else {
        var roleData = {
          roleName: "SUPERADMIN",
          description: "SUPERADMIN",
          permissions: {
            Configuration: {
              Role: {
                create: true,
                modify: true,
                view: true,
              },
              Department: {
                create: true,
                modify: true,
                view: true,
              },
              User: {
                create: true,
                modify: true,
                view: true,
              },
              Shift: {
                create: true,
                modify: true,
                view: true,
              },
              Plant: {
                create: true,
                modify: true,
                view: true,
              },
              Zone: {
                create: true,
                modify: true,
                view: true,
              },
              Machine: {
                create: true,
                modify: true,
                view: true,
              },
              Mapping: {
                create: true,
                modify: true,
                view: true,
              },
              PartConfig: {
                create: true,
                modify: true,
                view: true,
              },
              Template: {
                create: true,
                modify: true,
                view: true,
              },
              Master: {
                create: true,
                modify: true,
                view: true,
              },
              Checklist: {
                create: true,
                modify: true,
                view: true,
              },
            },
          },
        };
        let roles = await addData(roleData, "role");
      }
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
}

async function dbInit() {
  try {
    let db = mongoose.connection;
    mongoose.connect(
      `mongodb://${Config.database.host}:${Config.database.port}/${Config.database.db}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    let timer = setInterval(() => {
      mongoose.connect(
        `mongodb://${Config.database.host}:${Config.database.port}/${Config.database.db}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      autoIncrement.initialize(db);
    }, 10000);
    db.on("open", async function () {
      clearInterval(timer);
      logger.debug("Digital Database is connected...");
      await checkAdmin();
    });

    db.on("error", function (err) {
      logger.debug(err);
      logger.debug("Digital Database connection error ...");
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
