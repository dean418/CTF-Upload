const {Schema, model} = require('mongoose');

const challenge = new Schema({
	title: {type: String, required: true},
	type: {type: String, required: true},
	description: {type: String, required: true},
	attachment: {type: String, required: true}
});

module.exports = model('challenges', challenge);