/**
 * InboxController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = { 

	/*
	author: pablo ocanto
	mail  : pomalianni@gmail.com
	goal  : Register new entry and a asigne a new branch office delivery
  */
	async create(req, res) {

	const moment = require('moment');

	if(typeof req.body.target==='undefined' || req.body.target==='') {
		return res.status(500).send('Missing parameter target');
	}

	if (typeof req.body.entry_date==='undefined' || req.body.entry_date ==='') {
		return res.status(500).send('Missing entry_date parameter');	
	}

	var date = moment(req.body.entry_date,'YYYY-MM-DD', true);
	var isValid = date.isValid();

	if (!isValid){
		return res.status(500).send('Entry_date must be the following format YYYY-MM-DD');
	}

	//if (!(d.isValid())){
	//	return res.status(500).send('invalid entry_date or it is invalid');
	//}

	console.log("llamada al helper");

	const entry = await sails.helpers.distpacher(req)
				.intercept(()=>{return res.status(500).send('internal server error')});
	if (entry){
		return res.json(entry); 
	}
		return res.status(500).send('internal server error');

	},

	update(req, res) {
	const id = req.body.id	
	delete req.body.id
  	Inbox.updateOne({ id: id }).set(req.body).exec((err, newInbox) => {
  		if (err) {
  			return res.status(500).send('internal server error');
  		}
  		return res.json(newInbox);
  	});
	},

	delete(req, res) {
  	Inbox.destroy({ id: req.body.id }).exec((err, item) => {
	  	if (err) {
	  		return res.status(500).send('internal server error');
	  	}
	  		return res.json(item);
	  	});
	},

	get(req, res) {
		const params = req.allParams();
		if (params) {
			Inbox.find(params).exec((err, pacakages) => {
				if (err) {
					return res.status(500).send('internal server error');
				}
				return res.json(pacakages);
			});
		} else {
			Inbox.find().exec((err, pacakages) => {
				if (err) {
					return res.status(500).send('internal server error');
				}
				return res.json(pacakages);
			});
		}
	},



};
