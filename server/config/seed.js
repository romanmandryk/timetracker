/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';


var User = require('../api/user/user.model');
var Workentry = require('../api/workentry/workentry.model');

/*Workentry.find({}).remove(function() {
  Workentry.create({
    date : new Date(),
    hours : 2,
    desc: "Initial project setup"
  }, {
    date : new Date(),
    hours : 3,
    desc: "Setup Workentry endpoint and angluar resource, ctrl, view"
  });
});*/


/*User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});*/
