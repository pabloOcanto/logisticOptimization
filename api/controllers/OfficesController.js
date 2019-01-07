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
	description:massive creation from input file
  	*/

	initialize : function(req,res){
		var excelReader = require('../services/read-excel-data');
		var officesArrayJson =  excelReader.read('warehouse.xlsx');
		Offices.createEach(officesArrayJson).exec((err,list)=>{
			if (err){
				return res.serverError(err);
			}

			return res.json(list);
		});
	},


	/*
	Author:pablo Ocanto
	mail:pomalianni@gmail.com
	description:get offices with specified criteria 
				if you no specified criteria you get all offices
  	*/

	get :function(req,res){
		var params = req.allParams();
		if (params){

			if (params['limit']){
				params['limit'] = parseInt((params['limit']));
			}

			if (params['storage_limit']){
				params['storage_limit'] = parseInt((params['storage_limit']));
			}

			Offices.find(params).exec((err,offices)=>{
				if(err){
				return res.serverError(err);
				}
				return res.json(offices);
			});
		}else{
				Offices.find().exec((err,offices)=>{
				if(err){
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

	create:function(req,res){
		Offices.create(req.body).exec((err,office)=>{
			if (err){
				return res.serverError(err);
			}
			return res.json(office);
		})
	},


	update:function(req,res){

		if (req.body.code){
			Offices.update({code:req.body.code}).set(req.body).exec((err,office)=>{
			if(err){
				return res.serverError(err);
			}
			return res.json(office)});
		}else{
			return res.json("expected code")
		}

	},


	delete:function(req,res){

		var status = 202;
		var http = require('http');
		if (req.body.code){
			Offices.desttroy({code:req.body.code}).set(req.body).exec((err,office)=>{
			if(err){
				return res.serverError(err)
			}
			res.ok(res.status(status).end(http.STATUS_CODES[status]))
			});
		}else{
			return res.json("expected code");	
		}

	}	



};

