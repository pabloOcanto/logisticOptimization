/*
Author: pablo Ocanto
mail:pomalianni@gmail.com
date:2190107
description:'this function return a promise wit the response of the service google-api-distance
endpoint:https://maps.googleapis.com/maps/api/distancematrix'
*/

module.exports =  function(orig, dest){

	var google_map = sails.config.custom.google_map
	var apiKey = sails.config.custom.apiKey

	var distance = require(google_map)
	distance.key(apiKey);
	distance.mode('driving');
	distance.units('imperial');

	var origin = new Array()
	origin.push(orig)
	var destination = new Array();


	destination.push(dest.city)


	let p = new Promise( (resolve, reject) => {

     distance.matrix(origin, destination, function (err, response) {
			if (err){
				reject('Bad request');
			}

			if (response.status != "OK"){
			reject('Invalid destination');
			}

			var arr = new Array();
			var arr_dest = {
				'code':dest.code,
				'city':dest.city,
				'storage':dest.storage,
				'limit':dest.limit,
			}
			arr.push(response);
			arr.push(arr_dest);

			resolve(arr);
		});

 	});

 	return p;


};