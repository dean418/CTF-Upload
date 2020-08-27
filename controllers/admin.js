const fs = require('fs');
const path = require('path');
const Command = require('../lib/command');
// const Mongoose = require('../lib/mongoose');
const Team = require('../models/team');

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

exports.handleCommand = (async(req, res) => {
	let data = {};

	switch(req.params.command) {
		case 'newChallenge':

			let zip = req.files.attachment;

			Command.newChallenge(req.body.title, req.body.type, req.body.description, zip.name, req.body.flag);
			fs.writeFileSync(path.join(__dirname, '/../public/challenges/', zip.name), zip.data);
			break;
		case 'getTeams':
			let teamsObj = await Team.getTeams();
			let teams = {}

			for(let team of teamsObj) {
				teams[team.name] = {flags: team.flags}
			}

			data = teams;
			break;
	}
	res.status(200).render('adminPanel', {data});
});