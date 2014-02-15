
/*
 * GET home page.
 */
var fs = require('fs');

module.exports = function(io) {
	var routes = {};
	routes.index = function (req, res) {
		//io.sockets.emit('payload');
		//io.sockets.emit('news', { hello: 'conkey' });
		res.render('index', { title: 'Express' });
	};
	routes.saveImage = function(req, res){
		fs.readFile(req.files.file.path, function (err, data) {
			var newPath = "public/uploads/"+req.files.file.originalFilename;
			buff= new Buffer(data.toString('base64'),'base64');
			io.sockets.emit('news', {
			    data: buff.toString('base64'),
			    width: req.files.file.width,
			    height: req.files.file.height
			});
			fs.writeFile(newPath, data, function (err) {
				res.redirect("back");
			});
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