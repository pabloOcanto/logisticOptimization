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
	goal  : Check in a new a pacakage and a asigne a new branch delivery
  */
  create : function(req,res){

  	var mainOffice = require('./MainOfficeController')
    var current_date = require('../services/today')
  	var pacakage =req.body;
   	var pacakage = mainOffice.dispatch(pacakage)

  	Inbox.create(pacakage).exec(function(err,items){
  		if (err) {
  			return res.json(err)
  		}	
  		return res.ok(code)

  	})
  },

  update : function(req,res){
  	Inbox.updateOne({ id:req.body.id}).set(req.body).exec(function(err,newInbox){
  		if (err) {
  			return res.json(err)
  		}
  		return res.json(newInbox)
  	})
  },

  delete:function(req,res){
  var status = 202;
	var http = require('http');
  	Inbox.destroy({id:req.body.id}).exec(function(err,items){
	  	if (err) {
	  		return res.json(err)
	  	}
	  	res.status(status).end(http.STATUS_CODES[status]);
	  	})
   },

    get :function(req,res){
      var params = req.allParams();      
      if (params){
          Inbox.find(params).exec((err,pacakages)=>{
          if(err){
          return res.serverError(err);
          }
          return res.json(pacakages);
        }); 
      }else{
        Inbox.find().exec((err,pacakages)=>{
        if(err){
        return res.serverError(err);
        }
        return res.json(pacakages);
      });
    }

  }



};

