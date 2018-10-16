var request = require('supertest');

var express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';

describe('POST New <%= baseName %>/<%= name %>', function() {
  it("creates new <%= baseName %>/<%= name %> and responds with json success message", function(done) {
    request(app)
      .post('/<%= baseName %>/<%= name %>')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        "<%= baseName %>/<%= name %>": {
          test: "test"
        }
      })
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        _id = res.body._id;
        done();
      });
  });
});

describe('GET List of <%= baseName %>/<%= name %>s', function() {
  it("responds with a list of <%= baseName %>/<%= name %> items in JSON", function(done) {
    request(app)
      .get('/<%= baseName %>/<%= name %>s')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET <%= baseName %>/<%= name %> by ID', function() {
  it("responds with a single <%= baseName %>/<%= name %> item in JSON", function(done) {
    request(app)
      .get('/<%= baseName %>/<%= _s.camelize(_.capitalize(name)) %>/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe("PUT <%= baseName %>/<%= name %> by ID", function() {
  it("updates <%= baseName %>/<%= name %> item in return JSON", function(done) {
    request(app)
      .put('/<%= baseName %>/<%= _s.camelize(_.capitalize(name)) %>/' + _id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        "<%= baseName %>/<%= name %>": {
          title: "Hell Is Where There Are No Robots"
        }
      })
      .expect(200, done);
  });
});

describe('DELETE <%= baseName %>/<%= name %> by ID', function() {
  it("should delete <%= baseName %>/<%= name %> and return 200 status code", function(done) {
    request(app)
      .del('/<%= baseName %>/<%= _s.camelize(_.capitalize(name)) %>/' + _id)
      .expect(204, done);
  });
});
