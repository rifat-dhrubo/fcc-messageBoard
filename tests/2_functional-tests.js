/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chaiHttp = require('chai-http');
const chai = require('chai');

const { assert } = chai;
const server = require('./server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('API ROUTING FOR /api/threads/:board', function() {
    suite('POST', function() {
      test('POST thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body._id, 'id', 'body should have a _id');
            assert.property(
              res.body.delete_password,
              'false',
              ' should have a default value of false'
            );
          });
        done();
      });
    });

    suite('GET', function() {
      test('GET thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(
              res.body.data,
              'data',
              'body should have a data property'
            );
            assert.isArray(
              res.body.data,
              'data array',
              'data should be an array'
            );
          });
        done();
      });
    });

    suite('DELETE', function() {
      test('GET thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.equal(re.body, 'success');
          });
        done();
      });
    });

    suite('PUT', function() {
      test('GET thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.equal(re.body, 'success');
          });
        done();
      });
    });
  });

  suite('API ROUTING FOR /api/replies/:board', function() {
    suite('POST', function() {
      test('POST thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(res.body._id, 'id', 'body should have a _id');
            assert.property(
              res.body.delete_password,
              'false',
              ' should have a default value of false'
            );
          });
        done();
      });
    });

    suite('GET', function() {
      test('GET thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(
              res.body.data,
              'data',
              'body should have a data property'
            );
            assert.isArray(
              res.body.data,
              'data array',
              'data should be an array'
            );
          });
        done();
      });
    });

    suite('DELETE', function() {
      test('GET thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.equal(res.body, 'success');
          });
        done();
      });
    });

    suite('PUT', function() {
      test('GET thread', function(done) {
        chai
          .request(server)
          .post('/api/threads/general')
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a string');
            assert.equal(res.body, 'success');
          });
        done();
      });
    });
  });
});
