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

		var today  = current_date();
		var entry_date  = inbox.entry_date;
		today = moment(today);
		entry_date = moment(entry_date);
		inbox['egress_date'] = current_date();
		inbox['penaltyCost'] = today.diff(entry_date, 'days') * 70 
		inbox['penaltyCost'] += 70
		inbox['penaltyCost'] = parseInt(inbox['penaltyCost'])

		 // costo de penalizacion + dias por no entregar
		this.getDistances(inbox);
	    this.resolveBestOptionDelivery(inbox);
	    Temporal.destroy({}).exec((err,succ) =>{});

		return 1;


	},

    /*
	Author:pablo ocanto
	date:20180107
	mail:pomalianni@gmial.com
	description:'This method calculate the distance of delivery 
	between the destination with each city of our warehouse'.
	*/


	getDistances : function(inbox){
	console.log(inbox)

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


				Temporal.create({target:inbox.target,warehouse:office.code,current_storage:office.storage,current_limte:office.limit,distance:distance}).exec((err,succ)=>{});
	 			}).catch( (response) => {
	    		return 500;
				});
		
	  		}


   	}).catch( (office) => {
      	console.log(records);
	});


	return;

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

   		console.log(inbox)
	
   	let p = new Promise( (resolve, reject) => {
   		Temporal.find({}).sort('distance asc').limit(10).exec((err,list)=>{
			if(err) {
		    	reject('error');
		    }
			resolve(list);

	  	});
  	});

   	p.then( (records) => {
   		console.log(records);

  	for (key in records) {	
  			console.log(records[key]);	
			var limit_alert = (((records[key].current_storage +1) *100 )/records[key].current_limte).toFixed(2)
			var deliveryCost = Math.round(records[key].distance/5);
			var penaltyCost = inbox.penaltyCost;

		    if (limit_alert >= 95){
				//Alert.findOrCreate({code:records[key].warehouse},{code:records[key].warehouse,percent:limit_alert}).exec((err,alert)=>{console.log(err)});
				continue;
			}

			if (deliveryCost  <= penaltyCost ){
				records[key].current_storage =parseInt(records[key].current_storage)+1;
				warehouse = records[key].warehouse;
				inbox['office'] = warehouse;
   				inbox['status'] ='delivered'
   				storage:records[key].current_storage +=1;
				Offices.updateOne({id:records[key].warehouse}).set({storage:records[key].current_storage}).exec((err,offic)=>{
				});
				break;
			}

   		}

   		this.checkStatus(inbox);


   	}).catch( (records) => {
      	console.log(records);
	});

   	//console.log(inbox);
   	return;
   	},

   	/*
	Author:pablo ocanto
	date:20180107
	mail:pomalianni@gmial.com
	description:'If the delivery couldn't be assigned,  it is checked if some branch 
	office has storage available as long as the delivery cost not to be greater than penalty cost' 
	*/


   	checkStatus:function(inbox){

   		console.log(inbox)
   		console.log(inbox.office)
   		//return;
   		
   		if (typeof inbox.office === 'undefined'){
  
	   		Temporal.find({id:inbox.id}).sort().limit(10).exec((err,records) =>{
	   			for (key in records) {	
	   				var penaltyCost = inbox.penaltyCost
			   		var deliveryCost = Math.round(orderedList[key].distance/5)
					console.log(deliveryCost)
					console.log(penaltyCost)
					records[key].current_storage += 1;

					if ((deliveryCost  <= penaltyCost ) && (records[key].current_storage < records[key].current_limte)) {
						warehouse = records[key].warehouse;
						inbox['office'] = warehouse;
   						inbox['status'] ='delivered';
   						records[key].current_storage +=1;
   						Offices.updateOne({id:records[key].warehouse}).set({storage:records[key].current_storage}).exec((err,offic)=>{});
   						break;
				    }

		   		}
		   	})


   	    }

   	    if (typeof inbox.office === 'undefined') {
   	    	inbox['egress_date'] = '';
   	    }

   	    Inbox.create(inbox).exec((err,item)=>{console.log(err)});
   	    

   	    return;

    }



}   	




