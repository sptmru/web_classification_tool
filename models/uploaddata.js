var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('localhost', 'classification');

var app = express();
var done = false;

app.use(multer({ dest: './uploads/',
				 rename: function (fieldname, filename) {
				 	return filename;
				 },
				 onFileUploadStart: function(file) {

				 },
				 onFileUploadComplete: function(file) {
				 	//var lineList = fs.readFileSync(file).toString().split('\n');
				 	//lineList.shift;

				 	//var schemaKeyList = [''];
				 	console.log('done, filename is: ' + file);

				 }
				}));

