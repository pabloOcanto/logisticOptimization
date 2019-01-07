 module.exports = function DelveryAlogoritm(inbox){

    var moment = require('moment');	
	var current_date = require('../services/today');
	var distance =require('../services/distance');
	var insertByDistance =require('../services/insertByDistance');

	var today  = moment(current_date());
	var entry_date  = moment(inbox.entry_date);
	var penaltyCost = today.diff(entry_date) * 70 + 70; // costo de penalizacion + dias por no entregar

	var target = inbox.target
	var offices = Offices.find({}).exec(function(err,list){
  	});

  	offices.forEach((office)=>{
  		orderedList = insertByDistance.sortBydistance(distance,response[1],orderedList);
  	});

	for (key in orderedList) {
		
		var limit_alert = (((orderedList[key].storage +1) *100 )/orderedList[key].limit).toFixed(2)
		var deliveryCost = Math.round(orderedList[key].distance/5)

		
		if ((deliveryCost  <= penaltyCost ) && (limit_alert <= 95)) {
		var oficeUpdate='';
		Office.updateOne({code:orderedList[key].code}).set({storage:orderedList[key].storage+1}).exec((err,offic)=>{});

		}	
		
		if(oficeUpdate != ''){
			var limit_alert = (((orderedList[key].storage +1) *100 )/orderedList[key].limit).toFixed(2)
			if (limit_alert >= 95){
				var newAlert = '';
				Alert.create({code:key,percente:limit_alert}).exec((err,alert)=>{
				Office.updateOne({code:key}).set({storage:orderedList[key].storage-1}).exec();
		
			 });

			}

		}
		
	}

}			