const Team = require('../models/team');
const Challenge = require('../models/challenge');

exports.getHome = (async(req, res) => {
	const DBChallenges = await Challenge.getAllChallenges();

	let challenges = {}

	for(let challenge of DBChallenges) {
		challenges[challenge.title] = {
			type: challenge.type,
			description: challenge.description,
			attachment: challenge.attachment
		}
	}

	res.render('index', {team: req.session.team, challenges, result: req.query.result});
});

exports.checkFlag = (async(req, res) => {
	let inputChallenge = req.params.challenge;
	let inputFlag = req.body.flag;

	let challenge = await Challenge.getChallenge(inputChallenge);

	if(challenge.flag == inputFlag) {
		let hasFlag = await Team.addFlag(req.session.team, inputFlag);
		let message = 'You found a flag!';

		if(hasFlag) {
			message = 'You have already submitted that flag!'
		}

		res.redirect(`/home/?result=${encodeURIComponent(message)}`);
	} else {
		res.redirect(`/home/?result=${encodeURIComponent('That\'s not a flag!')}`);
	}
});