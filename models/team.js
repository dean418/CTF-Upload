const {Schema, model} = require('mongoose');

const team = new Schema({
	name: {type: String, required: true},
	flags: {type: Array}
});

module.exports = model('teams', team);