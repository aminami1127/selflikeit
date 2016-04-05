'use strict';
var views = require('co-views');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/posts');
var co = require('co');

var posts = wrap(db.get('posts'));

co(function* () {
  var posts = yield posts.find({});
});


module.exports.all = function* all(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield posts.find({});
};


module.exports.fetch = function* fetch(id, next) {
  if ('GET' != this.method) return yield next;
  var post = yield posts.findById(id);

  if (!post) {
    this.throw(404, 'post with id = ' + id + ' was not found');
  }
  this.body = yield post;
};


module.exports.add = function* add(data, next) {
  if ('POST' != this.method) return yield next;
  var post = yield parse.json(this, {limit: '1kb'});
  var inserted = yield posts.insert(post);

  if (!inserted) {
    this.throw(405, "The post couldn't be added.");
  }
  this.body = 'Done!';
};


module.exports.modify = function* modify(id, next) {
  if ('PUT' != this.method) return yield next;
  var data = yield parse.json(this, {limit: '1kb'});
  var post = yield posts.findById(id);

  if (!post) {
    this.throw(404, 'post with id = ' + id + ' was not found');
  }

  var updated = posts.updateById(id, {$set: data});

  if (!updated) {
    this.throw(405, "Unable to update.");
  } else {
    this.body = "Done";
  }
};


module.exports.remove = function* remove(id, next) {
  if ('DELETE' != this.method) return yield next;

  var post = yield posts.findById(id);

  if (!post) {
    this.throw(404, 'post with id = ' + id + ' was not found');
  }

  var removed = posts.remove({'_id': id});

  if (!removed) {
    this.throw(405, "Unable to delete.");
  } else {
    this.body = "Done";
  }
};
