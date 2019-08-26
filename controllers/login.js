exports.postLogin = ((req, res) => {
	let teamName = req.body.teamName;
	let password = req.body.password;

	res.redirect();
});

exports.getLogin = ((req, res) => {
	res.render('login');
});