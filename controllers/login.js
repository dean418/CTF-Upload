const nanoID = require('nanoid');
const Mongoose = require('../lib/mongoose');

exports.postLogin = (async (req, res) => {
	let teamName = req.body.teamName;
	let password = req.body.password;

	if(password.trim() !== process.env.CTF_KEY) {
		res.render('login', {err: 'The entered password is incorrect!'});
		return;
	}

	await Mongoose.createTeam(teamName);

	req.session.team = teamName;
	req.session.userID = nanoID();
	req.session.save();

	res.redirect('/home');
});

exports.getLogin = ((req, res) => {
	res.render('login');
});