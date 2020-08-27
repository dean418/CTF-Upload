const {Schema, model} = require('mongoose');

const challenge = new Schema({
	title: {type: String, required: true},
	type: {type: String, required: true},
	description: {type: String, required: true},
	attachment: {type: String, required: true},
	location: {type: String, required: true},
	flag: {type: String, required: true}
}, {
	toObject: {virtuals: true}
});

challenge.statics.getAllChallenges = async function () {
	const challenges = await this.find({});
	return challenges;
}

challenge.statics.getChallenge = async function (title) {
	let challenge = await this.findOne({title});
	return challenge;
}

module.exports = model('challenges', challenge);