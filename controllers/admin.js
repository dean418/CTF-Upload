exports.getAdmin = ((req, res) => {
	res.render('admin')
});

exports.postAdmin = ((req, res) => {
	let password = encodeURIComponent(req.body.password);
	res.redirect(`/adminPanel?password=${password}`);
});

exports.getAdminPanel = ((req, res) => {
	let password = decodeURIComponent(req.query.password);

	if(password == process.env.ADMIN) {
		res.render('adminPanel');
	} else {
		res.redirect('/admin');
	}
});