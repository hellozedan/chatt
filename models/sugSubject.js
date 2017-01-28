/**
 * Created by Joe on 06/06/2015.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var sugSubjectModel = new Schema({
	"user": {type: Schema.Types.ObjectId, ref: 'User'},
	"category": {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		"description": "Array of categories"
	},
	"title": {
		type: String
	},
	"status": {
		type: Boolean,
		default: true
	},
	"description": {
		type: String
	},
	create_date: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('sugSubject', sugSubjectModel);