const models = require("../dto");
const logger = require("../../../utils/logger");
const customError = require("../../../utils/customResponse");
const { HTML_STATUS_CODE } = require("../../../utils/constant");

exports.addData = (data, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Schema = models[schema];
      resolve(await Schema.create(data));
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};

exports.addAndUpdateList = (cond, data, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Schema = models[schema];

      resolve(
        await Schema.findOneAndUpdate(
          cond,
          { $set: data },
          { new: true, upsert: true }
        )
      );
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};

exports.updateDataById = async (id, data, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newSchema = models[schema];
      resolve(
        await newSchema.findByIdAndUpdate(
          id,
          {
            ...data,
            updated_date: new Date(),
          },
          {
            new: true,
          }
        )
      );
    } catch (error) {
      logger.error(`Update Error-- ${error}`);
      reject(error);
    }
  });
};

exports.getAllDataByCond = async (cond, schema) => {
  return new Promise(async function (resolve, reject) {
    try {
      const newSchema = models[schema];
      resolve(await newSchema.find(cond.query, cond.fields, cond.options));
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};
exports.deleteDataByCond = async (cond, schema) => {
  return new Promise(async function (resolve, reject) {
    try {
      const newSchema = models[schema];
      resolve(await newSchema.deleteOne(cond));
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};

exports.deleteDataByData = async (id, schema) => {
  return new Promise(async function (resolve, reject) {
    try {
      const newSchema = models[schema];

      resolve(await newSchema.findOneAndDelete(id));
    } catch (err) {
      logger.debug(err);
      reject(err);
    }
  });
};
exports.getOneDataBycond = async (searchFeilds, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schemaModel = models[schema];
      resolve(
        await schemaModel.findOne(
          searchFeilds.query,
          searchFeilds.fields,
          searchFeilds.options
        )
      );
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};
exports.getAllData = (schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Schema = models[schema];

      resolve(await Schema.find({}));
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};
exports.updateData = async (cond, updateDetail, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      let schemaModel = models[schema];
      resolve(
        await schemaModel.updateOne(cond, {
          $set: updateDetail,
        })
      );
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};
exports.deleteOneByCond = async (searchFeilds, schema) => {
  return new Promise(async (resolve, reject) => {
    try {
      let Schema = models[schema];
      resolve(
        await Schema.deleteOne(
          searchFeilds.query,
          searchFeilds.fields,
          searchFeilds.options
        )
      );
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });
};
exports.addDataByMany = async function (data, schema) {
  return new Promise(async function (resolve, reject) {
    try {
      const newSchema = models[schema];
      resolve(await newSchema.insertMany(data));
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};
exports.addAndUpdateData = async function (cond, data, schema) {
  return new Promise(async function (resolve, reject) {
    try {
      const newSchema = models[schema];
      resolve(
        await newSchema.findOneAndUpdate(cond, data, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        })
      );
    } catch (err) {
      logger.error(err);
      reject(err);
    }
  });
};
