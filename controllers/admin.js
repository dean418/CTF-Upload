const fs = require('fs');
const path = require('path');
const Command = require('../lib/command');

exports.getAdmin = ((req, res) => {
	res.render('admin')
});

exports.postAdmin = ((req, res) => {
	if(req.body.password == process.env.ADMIN) {
		res.render('adminPanel');
	} else {
		res.redirect('/admin');
	}
});

exports.handleCommand = ((req, res) => {
	let zip = req.files.attachment;
	let title = req.body.title;
	let type = req.body.type;
	let description = req.body.description;
	let attachment = zip.name
	
	switch(req.params.command) {
		case 'newChallenge':
			Command.newChallenge(title, type, description, attachment);
			fs.writeFileSync(path.join(__dirname, '/../public/challenges/', zip.name), zip.data.toString());
			break;
	}
	res.status(200).render('adminPanel');
});