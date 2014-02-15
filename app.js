
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
//var http = require('http');
var path = require('path');
var app = express();
var dust = require('dustjs-linkedin')
, cons = require('consolidate');

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.favicon());
app.engine('dust', cons.dust);
app.set('template_engine', 'dust');
app.set('view engine', 'dust');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.multipart());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);


/*
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var routes = require('./routes')(io);
app.get('/', routes.index);
app.post('/image', routes.saveImage);

io.sockets.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
