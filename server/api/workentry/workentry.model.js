'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkentrySchema = new Schema({
  date: Date,
  hours: Number,
  desc: String,
  active: Boolean,
  user : {type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Workentry', WorkentrySchema);
