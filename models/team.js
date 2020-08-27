const {Schema, model} = require('mongoose');

const team = new Schema({
	name: {type: String, required: true},
	flags: {type: Array}
});

team.statics.getTeams = async function() {
	const teams = await this.find({});
	return teams;
}

team.statics.createTeam = async function(name) {
	let docs = await this.getTeams();
	for(let doc of docs) {
		if (doc.name === name) return true;
	}

	let team = new this({name: name});
	team.save();

	return false;
}

team.statics.getFlags = async function (name) {
	const teamDoc = await this.findOne({name});
	return teamDoc.flags;
}

team.statics.checkFlag = async function (name, flag) {
	let flags = await this.getFlags(name);

	for(let existingFlag of flags) {
		if(existingFlag == flag) {
			return true;
		}
	}
	return false;
}

team.statics.addFlag = async function (name, flag) {
	let hasFlag = await this.checkFlag(name, flag);

	if(hasFlag) {
		return true;
	}

	this.findOneAndUpdate({name}, {$push: {flags: flag}}, (err) => {
		if(err) console.log(err);
	});

	return false;
}

module.exports = model('teams', team);