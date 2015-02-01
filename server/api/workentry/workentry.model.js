'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkentrySchema = new Schema({
  date: {type:Date, required:true},
  hours: {type:Number, required:true},
  desc: {type:String, required:true},
  active: Boolean,
  user : {type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Workentry', WorkentrySchema);
