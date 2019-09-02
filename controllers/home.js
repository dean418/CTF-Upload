const Command = require('../lib/command');

exports.getHome = (async(req, res) => {
	const DBChallenges = await Command.getAllChallenges();
	
	let challenges = {}

	for(let challenge of DBChallenges) {
		challenges[challenge.title] = {
			type: challenge.type,
			description: challenge.description,
			attachment: challenge.attachment
		}
	}

	res.render('index', {team: req.session.team, challenges});
});

// challenges{
// 	title{
// 		type,
// 		description,
// 		attachment
// 	}
// }