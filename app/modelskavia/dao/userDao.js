const user = require("../dto/user");
const role = require("../dto/role");
const _ = require("lodash");
const utilities = require("../../../utils/utilities");
const logger = require("../../../utils/logger");
const customError = require("../../../utils/customResponse")
const {HTML_STATUS_CODE} = require('../../../utils/constant') 
/*
 * Add User
 */
exports.addUser = async (queryparam) => {
  return new Promise(async function (resolve, reject) {
    try {
      let hash = utilities.encrypt(queryparam.password);
      queryparam.password = hash;
      let userResult = await user.findOneAndUpdate(
        {
          userName: queryparam.userName,
        },
        queryparam,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );
      resolve(userResult);
    } catch (err) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};

exports.updateUser = async (updateData) => {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(
        await user.findOneAndUpdate(
          {
            email: updateData.query.email,
          },
          updateData.update,
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
          }
        )
      );
    } catch (err) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};

/*
 * Delete User
 */
exports.deleteUser = async (searchField) => {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(await user.findByIdAndRemove({ email: searchField }));
    } catch (err) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};

exports.getById = (id) => {
  return user.findUser("_id", id);
};

exports.getOne = (cond) => {
  return user.find(cond);
};

exports.getUserAndRole = (cond) => {
  return user.findOne(cond);
};

exports.getByEmail = (email) => {
  return user.findUser("email", email);
};

// For Update User Detail
exports.update = (cond, userDetail) => {
  return user.updateOne(cond, { $set: userDetail });
};

exports.getByToken = (token) => {
  return user.findOne({ otp: token });
};

exports.getUserByFields = async function (data) {
  return new Promise(async function (resolve, reject) {
    try {
      resolve(await user.find(data.query, data.fields, data.options));
    } catch (err) {
      logger.error(err);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};

exports.passwordUpdate = async (id, data) => {
  return new Promise(async function (resolve, reject) {
    try {
      let hash = utilities.encrypt(data.password);
      let password = hash;

      let userResult = await user.updateOne(id, {
        $set: {
          password: password,
        },
      });
      resolve(userResult);
    } catch (err) {
      logger.error(`Update password Error-- ${err}`);
      reject(customError.error(HTML_STATUS_CODE.INTERNAL_ERROR, err));
    }
  });
};
