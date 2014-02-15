
/*
 * GET home page.
 */
var fs = require('fs');

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
};