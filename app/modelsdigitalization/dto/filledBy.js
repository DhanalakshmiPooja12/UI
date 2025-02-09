const { fill } = require('lodash');
const mongoose = require('mongoose');

const filledBySchema = mongoose.Schema({
    masterName:{
        type:String,
       
    },
    Tempname:{
        type:String,
        required:true
    },
    header:{
        type:Array
    },
    body:{
        type:Array
    },
    footer:{
        type:Array
    },
    Instruction:{
        type:Array
    },
    checklistName:{
        type:String,
        unique:true
    },
},{
    timestamps: true
});

const toolTip = mongoose.model('filledBy',filledBySchema);
module.exports = toolTip;