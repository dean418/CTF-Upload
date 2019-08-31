const Session = require('../models/session.js');
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

	static async checkSession(userID) {
		let sessions = await Mongoose.getSessions();

		for(let session of sessions) {
			if(JSON.parse(session.session).userID == userID) return true;
		}

		return false;
	}
}

module.exports = Mongoose;