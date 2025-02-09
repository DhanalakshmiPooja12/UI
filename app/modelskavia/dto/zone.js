/* 
 * WIMERA CONFIDENTIAL
* __________________
* 
*  [2019-20] - WIMERA SYSTEMS PVT. LIMITED
*  All Rights Reserved.
* 
* NOTICE:  All information contained herein is, and remains
* the property of WIMERA SYSTEMS PVT. LIMITED. The intellectual and 
* technical concepts contained  herein are proprietary to 
* WIMERA SYSTEMS PVT. LIMITED. may be covered by Patents, patents in process, 
* and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from WIMERA SYSTEMS PVT. LIMITED.

 * @Author: Sai (sai@wimerasys.com)
 *          
 *
 *
 */
/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var zoneSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/

    zoneId: {
      type: String,
      required: true,
      unique: true,
    },

    plantData: {
      type: Object,
      required: true,
    },

    zoneName: {
      type: String,
    },
    supervisorZoneMap:{
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Define indexes
 */

/*
 * Auto increament
 */

/*
 * we need to create a model using
 * the above schema
 */
var zone = mongoose.model("Zone", zoneSchema);

module.exports = zone;
