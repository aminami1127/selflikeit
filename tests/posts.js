var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:1337");

var _id = '';

describe("POSTS CRUD REST API", function(){

  // # 1 should create a post with status 201

  it("should create a post with status 201", function(done){
    server
    .post("/posts/")
    .send({'text': 'foo', 'date': '2016-04-01T20:00:00', 'like': 10, 'user_id': 'test'})
    .expect("Content-type", /json/)
    .expect(201)
    .end(function(err, res){
      should.not.exist(err);
      _id = res.body._id;
      done();
    });
  });

  // # 2 should get a specified id post with status 200

  it("should get a specified id post with status 200", function(done){
    server
    .get("/posts/" + _id)
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res){
      should(res.body).have.property('_id', _id);
      should.not.exist(err);
      done();
    });
  });

  // # 3 should update a specified id post with status 200

  it("should update a specified id post with status 204", function(done){
    server
    .put("/posts/" + _id)
    .send({'text': 'bar'})
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res){
      should(res.body).have.property('text', 'bar');
      should.not.exist(err);
      done();
    });
  });

  // # 4 should delete a specified id post with status 204

  it("should delete a specified id post with status 204", function(done){
    server
    .delete("/posts/" + _id)
    .expect(204)
    .end(function(err, res){
      should.not.exist(err);
      done();
    });
  });

  // # 5 should return posts list

  it("should return posts list", function(done){
    server
    .get("/posts/")
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res){
      res.body.should.not.containEql(
        {'_id': _id, 'text': 'bar', 'date': '2016-04-01T20:00:00', 'like': 10, 'user_id': 'test'}
      );
      should.not.exist(err);
      done();
    });
  });

});
