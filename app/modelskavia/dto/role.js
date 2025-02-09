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
 * Rev.01 : 01-July-2020     @Author: Sai (sai@wimerasys.com)
 * Added Dto file
 * 
 */
/*
 * retrieve the required modules
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema
    //  zone =require('./zone');


const roleSchema = new Schema({

    /****************************************************************
     *                          columns
     ****************************************************************/

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    permissions: {
        type: Object
    }


}, {
    timestamps: true
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
const role = mongoose.model('Role', roleSchema);

module.exports = role;