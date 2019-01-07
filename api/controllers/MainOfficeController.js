/**
 * MainOfficeController
 *
 * @description ::This object will be used like a helper 
 				  with the final purpose to decide wich branch office will be assigned.

 */

module.exports = {

	dispatch: function(inbox){

		var moment = require('moment');	
		var current_date = require('../services/today');
		var distance =require('../services/distance');
		var insertByDistance =require('../services/insertByDistance');

		var today  = moment(current_date());
		var entry_date  = moment(inbox.entry_date);
		var penaltyCost = today.diff(entry_date) * 70 + 70; // costo de penalizacion + dias por no entregar
  
		this.getDistances(inbox);
		this.resolveBestOptionDelivery(inbox)
		this.checkStatus(inbox)

		return inbox;
	},

    /*
	Author:pablo ocanto
	date:20180107
	mail:pomalianni@gmial.com
	description:'This method calculate the distance of delivery 
	between the destination with each city of our warehouse'.
	*/


	getDistances : function(inbox){

	let p = new Promise( (resolve, reject) => {

	  	var target = inbox.target
		Offices.find({}).exec(function(err,list){
		 	if(err) {
    		reject('error');
  		}

  		list.push(target);

  		resolve(list);

  		})});


  	p.then( (office) => {

  		    var orderedList = new Array();
	  		for ( i in office ) {
	  			var pDistance = distance(inbox.target,office[i]);
	  			pDistance.then( (response) => {	
	  			var attrib = response[0].rows[0].elements[0];
				var distance = parseFloat(attrib.distance.value / 1000).toFixed(2);
				var office = response[1];

				Temporal.save({target:inbox.target,warehouse:office.code,current_storage:office.storage,current_limte:office.limit,distance:distance}).exec((err,succ)=>{});
	 			}).catch( (response) => {
	    		return 500;
				});
	  		}


   	}).catch( (office) => {
      	return 500;
	});

   },



   /*
	Author:pablo ocanto
	date:20180107
	mail:pomalianni@gmial.com
	description:'This method take the records from table temporal 
	and iterate for each one, check the cost and storage available and assign a warehouse of delivery .'

	Rule for delivery : if delivery Cost is less than penalty cost.
	and percent storage not greater than 95 percent.
	penaltyCost = (days passe by USD 70)
	
	*/

   	resolveBestOptionDelivery :function(inbox){

   		Temporal.find({}).sort({ distance: 'ASC' }).exec((err,records) =>{

 			var limit_alert = (((records.storage +1) *100 )/records[key].limit).toFixed(2)
			var deliveryCost = Math.round(records[key].distance/5)

			if ((deliveryCost  <= penaltyCost ) && (limit_alert <= 95)) {
				inbox.office = records.code;
				Office.updateOne({code:records[key].code}).set({storage:records[key].storage+1}).exec((err,offic)=>{});
				if (limit_alert+1 >= 95){
					Alert.create({code:records[key].code,percente:limit_alert}).exec((err,alert)=>{});
				}

			}

   		});


   		Temporal.destroy().exec(()=>{});

   	},

   	/*
	Author:pablo ocanto
	date:20180107
	mail:pomalianni@gmial.com
	description:'If the delivery couldn't be assigned,  it is checked if some branch 
	office has storage available as long as the delivery cost not to be greater than penalty cost' 
	*/


   	checkStatus:function(inbox){

   		if (inbox.office != ''){

   			Temporal.find({id:inbox.id}).sort({ distance: 'ASC' }).exec((err,records) =>{
	   		var limit_alert = (((orderedList[key].storage +1) *100 )/orderedList[key].limit).toFixed(2)
			var deliveryCost = Math.round(orderedList[key].distance/5)

			if ((deliveryCost  <= penaltyCost ) && (limit_alert < 100)) {
				inbox.office = records.code;
				Office.updateOne({code:orderedList[key].code}).set({storage:orderedList[key].storage+1}).exec((err,offic)=>{});
		    }

   			});

   		}


   	}

}   	




