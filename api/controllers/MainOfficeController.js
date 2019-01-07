/**
 * MainOfficeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
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
				//orderedList = insertByDistance.sortBydistance(distance,response[1],orderedList);		
				//gurda informacion en una tabla temporal con el ID de la bandeja de entrada para armar el algoritmo de asignacion
	
	 			}).catch( (response) => {
	    		return 500;
				});
	  		}


   	}).catch( (office) => {
      	return 500;
	});

   },



   	resolveBestOptionDelivery :function(inbox){

   		Temporal.find({id:inbox.id}).sort({ distance: 'ASC' }).exec((err,records) =>{

   			//chequeo si c/sucursal si no supera el 95% de su capacidad
   			// y que se conveniente  pagar la multa por no entregar el paquete
 			var limit_alert = (((orderedList[key].storage +1) *100 )/orderedList[key].limit).toFixed(2)
			var deliveryCost = Math.round(orderedList[key].distance/5)

			if ((deliveryCost  <= penaltyCost ) && (limit_alert <= 95)) {
				//Actualizo el stock de la surscal
				Office.updateOne({code:orderedList[key].code}).set({storage:orderedList[key].storage+1}).exec((err,offic)=>{});
				

				//genero un alerta a la surcusal central
				if (limit_alert+1 >= 95){
					Alert.create({code:key,percente:limit_alert}).exec((err,alert)=>{});
				}

				//elimino registro de la tabla temporal
				//solo se uttiliza para procesamiento del paquete.
			}

   		});

   	},


   	//va a tomar el pakete y si no pudo ser asignado
   	//solo comprueba le mejor obcion de  costo de entrega 
   	checkStatus:function(inbox){
   		Temporal.find({id:inbox.id}).sort({ distance: 'ASC' }).exec((err,records) =>{

	   		var limit_alert = (((orderedList[key].storage +1) *100 )/orderedList[key].limit).toFixed(2)
			var deliveryCost = Math.round(orderedList[key].distance/5)

			if ((deliveryCost  <= penaltyCost ) && (limit_alert < 100)) {
					//Actualizo el stock de la surscal
			Office.updateOne({code:orderedList[key].code}).set({storage:orderedList[key].storage+1}).exec((err,offic)=>{});
			//genero un alerta de aviso crito a la sucursal
			if (limit_alert+1 >= 95){
				Alert.create({code:key,percente:limit_alert}).exec((err,alert)=>{});
				}
			}

   		});

   	},




};




