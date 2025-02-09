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

var plantSchema = new Schema({
  /****************************************************************
   *                          columns
   ****************************************************************/

  plantId: {
    type: String,
    required: true,
    unique: true,
  },

  plantName: {
    type: String,
  },

  location: {
    type: String,
    required: true,
  },

  excludeZone: {
    type: Array,
    default: []
  }

}, {
  timestamps: true,
});

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
var plant = mongoose.model("Plant", plantSchema);

module.exports = plant;