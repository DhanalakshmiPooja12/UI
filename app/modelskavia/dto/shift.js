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

 *
 * Revision number:
 * ******************
 * @Author: Alpna (alpna@wimerasys.com)
 * shifts schema created
 * 
 */

/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var shiftSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/
    // _id: {
    //   type: String,
    //   required: true
    // },

    shiftId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },

    startTime: {
      type: String,
    },

    endTime: {
      type: String,
    },

    duration: {
      type: String,
    },

    plannedDownTime: {
      type: String,
    },
    startdownTime: {
      type: String,
    },
    enddownTime: {
      type: String,
    },

    availability: {
      type: String,
    },

    endNextDayFlag: {
      type: Boolean,
      default: false,
    },

    startNextDayFlag: {
      type: Boolean,
      default: false,
    },
    dayArray: {
      type: Array,
      default: [],
    },

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
var shift = mongoose.model("Shift", shiftSchema);

module.exports = shift;
