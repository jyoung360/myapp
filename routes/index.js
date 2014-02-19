
/*
 * GET home page.
 */
var fs = require('fs');

module.exports = function(io) {
	var routes = {};
	routes.index = function (req, res) {
		res.render('index', { host: req.headers.host });
	};
	routes.stream = function (req, res) {
		res.render('stream', { host: req.headers.host });
	};
	routes.saveImage = function(req, res){
		fs.readFile(req.files.attachment.file.path, function (err, data) {
			buff= new Buffer(data.toString('base64'),'base64');
			io.sockets.emit('news', {
			    data: buff.toString('base64'),
			    width: req.files.attachment.file.width,
			    height: req.files.attachment.file.height
			});
			res.redirect("back");
		});
	};
	return routes;
};
/*
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.saveImage = function(req, res){
	fs.readFile(req.files.file.path, function (err, data) {
		var newPath = "public/uploads/"+req.files.file.originalFilename;
		fs.writeFile(newPath, data, function (err) {
			res.redirect("back");
		});
	});
};*/