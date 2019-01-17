/**
 * OfficesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	/*
	Author:pablo Ocanto
	mail:pomalianni@gmail.com
	description:get offices with specified criteria
				if you no specified criteria you get all offices
  	*/

	get(req, res) {

		const params = req.allParams();
		if (params) {
			if (params.limit) {
				params.limit = parseInt((params.limit));
			}

			if (params.storage_limit) {
				params.storage_limit = parseInt((params.storage_limit));
			}

			Offices.find(params).exec((err, offices) => {
				if (err) {
					return res.serverError(err);
				}
				return res.json(offices);
			});
		} else {
			Offices.find().exec((err, offices) => {
				if (err) {
					return res.serverError(err);
				}
				return res.json(offices);
			});
		}
	},

	/*
	Author:pablo Ocanto
	mail:pomalianni@gmail.com
	description:get offices with specified criteria
				if you no specified criteria you get all offices
  	*/

	create(req, res) {
		Offices.create(req.body).exec((err, office) => {
			if (err) {
				return res.serverError(err);
			}
			return res.json(office);
		});
	},


	update(req, res) {
		if (req.body.code) {
			Offices.update({ code: req.body.code }).set(req.body).exec((err, office) => {
				if (err) {
					return res.serverError(err);
				}
				return res.json(office);
			});
		} else {
			return res.json('expected code');
		}
	},


	delete(req, res) {
		const status = 202;
		const http = require('http');
		if (req.body.code) {
			Offices.desttroy({ code: req.body.code }).set(req.body).exec((err, office) => {
				if (err) {
					return res.serverError(err);
				}
				res.ok(res.status(status).end(http.STATUS_CODES[status]));
			});
		} else {
			return res.json('expected code');
		}
	},


};
