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
		console.log(params);
		if (params) {
			if (params.limit) {
				params.limit = parseInt((params.limit));
			}

			if (params.storage_limit) {
				params.storage_limit = parseInt((params.storage_limit));
			}

			Offices.find(params).exec((err, offices) => {
				if (err) {
					return res.status(500).send('internal server error');
				}
				return res.json(offices);
			});
		} else {
			Offices.find().exec((err, offices) => {
				if (err) {
					return res.status(500).send('internal server error');
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
				return res.status(500).send('internal server error');
			}
			return res.json(office);
		});
	},


	update(req, res) {
		const id = req.body.id	
		delete req.body.id

		Offices.update({ id: id }).set(req.body).exec((err, office) => {
			console.log(err)
			console.log(office)
			if (err) {
				return res.status(500).send('internal server error');
			}
			return res.json(office);
		});
	 
	},


	delete(req, res) {
		const id = req.body.id	
		delete req.body.id

		Offices.destroy({ id: id}).set(req.body).exec((err, office) => {
			if (err) {
				return res.status(500).send('internal server error');
			}
			res.ok(office);
		});
	
	},


};
