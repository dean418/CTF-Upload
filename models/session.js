const {Schema, model} = require('mongoose');

const session = new Schema({
	expires: {type: Date, required: true},
	session: {type: String, required: true}
});

module.exports = model('sessions', session);