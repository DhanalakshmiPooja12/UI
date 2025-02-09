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

 *  @Author: Alpna (alpna@wimerasys.com)
 * Added Dto file
 * 
 */
/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var cycleTimeSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/

    partId: {
      type: String,
      required: true,
      unique: true,
    },
    // programNumber: {
    //   type: String,
    //   required: true,
    
    // },
    // programName: {
    //   type: String,
    //   required: true,
    //     unique: true,
    // },
    partName:{
      type: String,
      required: true,
    },
    // stageNo:{
    //   type: String,
    //   required: true,
    // },
    // runningTime: {
    //   type: Number,
    //   required: true,
    // },
    // // handlingTime: {
    //   type: Number,
    //   required: true,
    // },
    totalCycleTime: {
      type: Number,
      required: true,
    },
    standardCycleTime:{
      type:Number,
      required:true
    },
    loadingTime:{
      type:Number,
      required:true
    },
    unloadingTime:{
      type:Number,
      required:true
    }
    // setupTime:{
    //   type: Number,
    //   required: true,
    // }
 
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
var cycletime = mongoose.model("cycleTime", cycleTimeSchema);

module.exports = cycletime;
