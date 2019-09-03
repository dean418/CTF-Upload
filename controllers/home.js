const Mongoose = require('../lib/mongoose');

exports.getHome = (async(req, res) => {
	const DBChallenges = await Mongoose.getAllChallenges();
	
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

	let challenge = await Mongoose.getChallenge(inputChallenge);

	if(challenge[0].flag == inputFlag) {
		console.log('yep')
		Mongoose.addFlag(req.session.team, inputFlag);
		
		res.redirect(`/home/?result=${encodeURIComponent('You found a flag!')}`);
	} else {
		res.redirect(`/home/?result=${encodeURIComponent('That\'s not a flag!')}`);
	}
});