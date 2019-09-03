const Challenge = require('../models/challenge');

class Command {
	static newChallenge(title, type, description, attachment, flag) {

		const challenge = new Challenge({
			title: title,
			type: type,
			description: description,
			attachment: attachment,
			flag: flag
		});
		challenge.save();
		return;
	}
}

module.exports = Command;