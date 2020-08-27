const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');

const Command = require('../lib/command');
const Team = require('../models/team');
const aws = require('../lib/aws');

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
			let location = await aws.upload(zip.name, zip.data);

			Command.newChallenge(req.body.title, req.body.type, req.body.description, zip.name, req.body.flag, location);
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