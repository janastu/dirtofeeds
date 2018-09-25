/*
RSS Generator for all files in a  given DIR path
inputs -> root path and output xml filename
channel options
*/

	

	var dir = require('node-dir');
	var RSS = require('rss');
	var fs = require('fs');
	var rootPath = "ForAnnotation/Images";
	var outputFile = 'images.xml';
	var filePaths;
	var xml;
	var Channel = new RSS({
		title: "Namma School Radio",
		description: "School Raw files",
		category: ["raw"],

	});

	dir.files(rootPath, function(err, files){
		if (err) throw err;
		filePaths = files;

		filePaths.forEach(function(path){
			Channel.item({
				title: path.split('\\')[2],
				custom_elements: [{
					file: path
				}]
			});
		});

		xml = Channel.xml({indent: true});

		fs.writeFile(outputFile, xml, function(err){
			if (err) throw err;
			console.log("file saved");
		});
	});

	

	


