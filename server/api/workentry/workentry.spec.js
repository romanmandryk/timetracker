'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var passport = require('passport');
var express = require('express');
var User = require('../user/user.model');

describe('GET /api/workentries', function() {

  function authenticate(user, cb){
    var req = request(app);
    user.save(function( err, user) {
      req.post('/auth/local')
        .send({email:user.email,password:user.password})
        .end( function(err, res){
          if (err) throw new Error(err);
          cb(res.body.token);
        });
    });
  }

  it('should respond with JSON array', function(done) {
    var user = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password'
    });

    authenticate(user, function(token){
      var req = request(app);
      req.get('/api/workentries')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
      });
    });


  it('should respond with unauthorized', function(done) {
    request(app)
      .get('/api/workentries')
      .expect(401)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
