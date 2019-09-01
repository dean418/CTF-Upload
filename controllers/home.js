exports.getHome = ((req, res) => {
	console.log(req.session)
	res.render('index', {team: req.session.team});
});