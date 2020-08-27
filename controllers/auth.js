const Session = require('../models/session');

exports.checkSignedOut = (async(req, res, next) => {
	let hasSession = await Session.checkSession(req.session.userID);

	if(hasSession) {
		next();
		return;
	}
	res.redirect('/');
});

exports.checkSignedIn = (async(req, res, next) => {
	let hasSession = await Session.checkSession(req.session.userID);

	if(!hasSession) {
		next();
		return;
	}
	res.redirect('/home');
});