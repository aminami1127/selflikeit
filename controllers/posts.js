'use strict';
var views = require('co-views');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/posts');
var co = require('co');

var posts = wrap(db.get('posts'));

co(function * () {
  var posts = yield posts.find({});
});

module.exports.all = function * all(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield posts.find({});
};

