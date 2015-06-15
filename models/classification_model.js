var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var ClassificationSchema = new mongoose.Schema({ name: String,
															handle: String,
															text: String,
															profile_url: String,
															background_url: String,
															classification1: String,
															classification2: String,
															timedate: String });

ClassificationSchema.plugin(random);
module.exports = mongoose.model('Classification', ClassificationSchema, 'classification');
