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
 * Rev.01 : 09-May-2020     @Author: Syed (syed@wimerasys.com)
 * Added Dto file
 * 
 */
/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
//  zone =require('./zone');

var userSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/

    name: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: Number,
    },
    // zoneData: {
    //   type: Array,
    // },
    roleName: {
      type: String,
    },
    dateOfJoining:{
      type:Date
    },
    /* 
    zoneId: {
      type: Object,
      ref: "Zone",
    }, */

    /*  plantId: {
      type: Object,
      ref: "Plant",
    }, */

    /*   ipAddress: {
      type: String,
    }, */
    /*  otp: {
      type: String,
    }, */

    roleData: {
      type: Object,
      required:true
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
var user = mongoose.model("User", userSchema);

module.exports = user;
