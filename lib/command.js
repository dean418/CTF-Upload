const Challenge = require('../models/challenge');

class Command {
	static newChallenge(title, type, description, attachment) {

		const challenge = new Challenge({
			title: title,
			type: type,
			description: description,
			attachment: attachment
		});
		challenge.save();
		return;
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

module.exports = Command;