process.env.NODE_ENV = 'test';
var request = require('supertest');

var app = require('../app.js');
var _id = '';

describe('POST New <%= baseName %>/<%= _s.classify(name) %>', function() {
  it("creates new <%= baseName %>/<%= _s.classify(name) %> and responds with json success message", function(done) {
    request(app).post('/<%= baseName %>/<%= _s.classify(name) %>').set('Accept', 'application/json').expect('Content-Type', /json/).send({
      "/<%= baseName %>/<%= _s.classify(name) %>": {
        test: "test"
      }
    }).expect(201).end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of /<%= baseName %>/<%= _s.classify(name) %>s', function() {
  it("responds with a list of /<%= baseName %>/<%= _s.classify(name) %> items in JSON", function(done) {
    request(app).get('/<%= baseName %>/<%= _s.classify(name) %>s').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});

describe('GET /<%= baseName %>/<%= _s.classify(name) %> by ID', function() {
  it("responds with a single /<%= baseName %>/<%= _s.classify(name) %> item in JSON", function(done) {
    request(app).get('/<%= baseName %>/<%= _s.camelize(_.capitalize(name)) %>/' + _id).set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});

describe("PUT /<%= baseName %>/<%= _s.classify(name) %> by ID", function() {
  it("updates /<%= baseName %>/<%= _s.classify(name) %> item in return JSON", function(done) {
    request(app).put('/<%= baseName %>/<%= _s.camelize(_.capitalize(name)) %>/' + _id).set('Accept', 'application/json').expect('Content-Type', /json/).send({
      "<%= baseName %>/<%= _s.classify(name) %>": {
        title: "Hell Is Where There Are No Robots"
      }
    }).expect(200, done);
  });
});

describe('DELETE /<%= baseName %>/<%= _s.classify(name) %> by ID', function() {
  it("should delete /<%= baseName %>/<%= _s.classify(name) %> and return 200 status code", function(done) {
    request(app).del('/<%= baseName %>/<%= _s.camelize(_.capitalize(name)) %>/' + _id).expect(204, done);
  });
});
