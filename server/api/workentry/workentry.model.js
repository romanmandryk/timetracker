'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorkentrySchema = new Schema({
  date: Date,
  hours: Number,
  desc: String,
  active: Boolean
});

module.exports = mongoose.model('Workentry', WorkentrySchema);
