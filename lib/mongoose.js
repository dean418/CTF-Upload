const Challenge = require('../models/challenge');

class Mongoose {

	static getChallenge(challenge) {
		return new Promise((resolve, reject) => {
			Challenge.find({title: challenge}, (err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
		});
	}

	// static async getAllChallenges() {
	// 	const challenges = await Challenge.find({});
	// 	return challenges;
	// }
}

module.exports = Mongoose;