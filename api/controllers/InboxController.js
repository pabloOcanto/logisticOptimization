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

	const entry = await sails.helpers.distpacher(req)
				.intercept((err)=>res.json(err));
	if (entry){
		return res.json(entry); 
	}
		return res.serverError('Something was wrong');

	},

	update(req, res) {
  	Inbox.updateOne({ id: req.body.id }).set(req.body).exec((err, newInbox) => {
  		if (err) {
  			return res.json(err);
  		}
  		return res.json(newInbox);
  	});
	},

	delete(req, res) {
		const status = 202;
		const http = require('http');
  	Inbox.destroy({ id: req.body.id }).exec((err, items) => {
	  	if (err) {
	  		return res.json(err);
	  	}
	  	res.status(status).end(http.STATUS_CODES[status]);
	  	});
	},

	get(req, res) {
		const params = req.allParams();
		if (params) {
			Inbox.find(params).exec((err, pacakages) => {
				if (err) {
					return res.serverError(err);
				}
				return res.json(pacakages);
			});
		} else {
			Inbox.find().exec((err, pacakages) => {
				if (err) {
					return res.serverError(err);
				}
				return res.json(pacakages);
			});
		}
	},



};
