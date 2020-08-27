const Challenge = require('../models/challenge');

class Command {
	static newChallenge(title, type, description, attachment, flag, location) {

		const challenge = new Challenge({
			title,
			type,
			description,
			attachment,
			flag,
			location
		});

		challenge.save();
		return;
	}
}

module.exports = Command;