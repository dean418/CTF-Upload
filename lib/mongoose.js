const Challenge = require('../models/challenge');
const Session = require('../models/session');
const Team = require('../models/team');

class Mongoose {
	static getSessions() {
		return new Promise((resolve, reject) => {
			Session.find({}, (err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
		});
	}

	static async checkSession(userID) {
		let sessions = await Mongoose.getSessions();

		for(let session of sessions) {
			if(JSON.parse(session.session).userID == userID) return true;
		}

		return false;
	}

	static getTeams() {
		return new Promise((resolve, reject) => {
			Team.find({}, (err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
		});
	}

	static async createTeam(name) {
		let docs = await Mongoose.getTeams();
		for(let doc of docs) {
			if (doc.name === name) return true;
		}

		let team = new Team({name: name});
		team.save();

		return false;
	}

	static getFlags(team) {
		return new Promise((resolve, reject) => {
			Team.find({name: team}, (err, docs) => {
				resolve(docs[0].flags)
			});
		});
	}

	static async checkFlag(team, flag) {
		let flags = await Mongoose.getFlags(team);

		for(let existingFlag of flags) {
			if(existingFlag == flag) {
				return;
			}
		}
	}

	static async addFlag(team, flag) {
		let hasFlag = await Mongoose.checkFlag(team, flag);

		if(hasFlag) {
			return;
		}

		Team.findOneAndUpdate({name: team}, {$push: {flags: flag}}, (err) => {
			if(err) console.log(err);
		});
	}

	static getChallenge(challenge) {
		return new Promise((resolve, reject) => {
			Challenge.find({title: challenge}, (err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
		});
	}

	static getAllChallenges() {
		return new Promise((resolve, reject) => {
			Challenge.find({}, (err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
		});
	}
}

module.exports = Mongoose;