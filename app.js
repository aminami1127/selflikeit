'use strict';
var posts = require('./controllers/posts');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/posts/', posts.all));
// app.use(route.get('/view/posts/', posts.list));
// app.use(route.get('/posts/:id', posts.fetch));
// app.use(route.post('/posts/', posts.add));
// app.use(route.put('/posts/:id', posts.modify));
// app.use(route.delete('/posts/:id', posts.remove));
// app.use(route.options('/', posts.options));
// app.use(route.trace('/', posts.trace));
// app.use(route.head('/', posts.head));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
