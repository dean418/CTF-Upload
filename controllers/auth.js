const Mongoose = require('../lib/mongoose.js');

exports.checkSignedOut = (async(req, res, next) => {
	let hasSession = await Mongoose.checkSession(req.session.userID);

	if(hasSession) {
		next();
		return;
	}
	res.redirect('/');
}); 

exports.checkSignedIn = (async(req, res, next) => {
	let hasSession = await Mongoose.checkSession(req.session.userID);

	if(!hasSession) {
		next();
		return
	}
	res.redirect('/home');
});