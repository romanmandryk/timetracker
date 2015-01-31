'use strict';

var _ = require('lodash');
var Workentry = require('./workentry.model');

// Get list of workentrys
exports.index = function(req, res) {
  Workentry.find({user: req.user._id}, function (err, workentrys) {
    if(err) { return handleError(res, err); }
    return res.json(200, workentrys);
  });
};

// Get a single workentry
exports.show = function(req, res) {
  Workentry.findById(req.params.id, function (err, workentry) {
    if(err) { return handleError(res, err); }
    if(!workentry) { return res.send(404); }
    return res.json(workentry);
  });
};

// Creates a new workentry in the DB.
exports.create = function(req, res) {
  req.body.user = req.user._id;
  Workentry.create(req.body, function(err, workentry) {
    if(err) { return handleError(res, err); }
    return res.json(201, workentry);
  });
};

// Updates an existing workentry in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Workentry.findById(req.params.id, function (err, workentry) {
    if (err) { return handleError(res, err); }
    if(!workentry) { return res.send(404); }
    if(!workentry.user) {workentry.user = req.user._id;}
    var updated = _.merge(workentry, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, workentry);
    });
  });
};

// Deletes a workentry from the DB.
exports.destroy = function(req, res) {
  Workentry.findById(req.params.id, function (err, workentry) {
    if(err) { return handleError(res, err); }
    if(!workentry) { return res.send(404); }
    workentry.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
