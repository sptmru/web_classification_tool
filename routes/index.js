var express = require('express');
var multer = require('multer');
var exec = require("child_process").exec;
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var mongooseToCsv = require('mongoose-to-csv');
var crypto = require('crypto');
var execSync = require("exec-sync");

var Classification = require('../models/classification_model.js');

var router = express.Router();

var uploadStatus = 'File was uploaded and is being processed now.';

function escapeShellArg (cmd) {
    return '\'' + cmd.replace(/\'/g, "'\\''") + '\'';
}

function randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});

router.get('/uploaddata', function(req, res, next) {
	res.render('uploaddata', { title: 'Upload CSV' });
});

router.post('/uploaddata',[ multer({ dest: './uploads/',
							onFileUploadStart: function(file, req, res) {
								if (file.mimetype !== 'text/csv' && file.mimetype !== 'application/vnd.ms-excel') {
									uploadStatus = 'Invalid file type. Please use CSV files only.';
									return false;	
								}
							},
							onFileUploadComplete: function(file, req, res) {
								var content = "empty";
								var command = "/bin/csvimport " + file.name;
								exec(command, function (error, stdout, stderr) {
  								});

							}}), function(req, res){
								    res.render('uploaddata', { title: 'Upload CSV', upload_status: uploadStatus });
								    res.status(204).end();
							}
						]
			);
router.get('/classify', function(req, res, next) {
	mongoose.connect('mongodb://localhost/classification');

	var id = '';
	var name = '';
	var handle = '';
	var profile_url = '';
	var background_url = '';
	var text = '';
	var timedate = '';

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		Classification.findOneRandom(function (err, record) {
			mongoose.connection.close();
			console.log(record);

			if (record) {
				id = record._id;
				name = record.name;
				handle = record.handle;
				profile_url = record.profile_url;
				background_url = record.background_url;
				text = record.text;
				timedate = record.timedate;
			}

			res.render('classify', { name: name,
						 profile_url: profile_url,
						 background_url: background_url,
						 text: text,
						 timedate: timedate,
						 id: id });

		});
	});
});

router.get('/classifying', function (req, res, next) {
	var id = req.param('id');
	var definedClass = req.param('define');

	if(definedClass === 'technical') {
		definedClass = "Technical";
	} else if(definedClass === 'nottechnical') {
		definedClass = "Not Technical";
	} else definedClass = '';

	console.log(id+ "  "+definedClass);

	mongoose.connect('mongodb://localhost/classification');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		Classification.findByIdAndUpdate(id, {"classification1": definedClass}, function(err, result) {
			if (err) console.log(err);
			//console.log(result);
		});
		mongoose.connection.close(); 
	});
	res.redirect('/classifysuccess?'+id);
});

router.get('/classifysuccess', function (req, res, next) {
	res.render('classifysuccess', { title: 'Thanks!' });
});

router.get('/exportresults', function (req, res, next) {
	var randomFileName = randomValueHex(10);
	var command = "/bin/csvexport " + randomFileName;
	execSync(command);
	res.render('exportresults', { title: 'Download CSV', csvname: randomFileName });
});

module.exports = router;
