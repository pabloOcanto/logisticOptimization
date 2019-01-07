module.exports =  function(orig, dest){

    //console.log("origen "+orig);
    //console.log("destion"+dest);

	var google_map = sails.config.custom.google_map
	var apiKey = sails.config.custom.apiKey

	var distance = require(google_map)
	distance.key(apiKey);
	distance.mode('driving');
	distance.units('imperial');

	//console.log(orig)

	//var origin = ['La Plata Buenos Aires']
	var origin = new Array()
	origin.push(orig)
	var destination = new Array();


	destination.push(dest.city)


	let p = new Promise( (resolve, reject) => {

     distance.matrix(origin, destination, function (err, response) {
			//console.log(distance)
			if (err){
				reject('Bad request');
			}

			if (response.status != "OK"){
				//return res.ok(destination)
				reject('Invalid destination');
				//return throw new Error ("google api bad request")
			}
			//var attrib = response.rows[0].elements[0];
			//resolve(parseFloat(attrib.distance.value / 1000).toFixed(2));
			var arr = new Array();
			var arr_dest = {
				'code':dest.code,
				'city':dest.city,
				'storage':dest.storage,
				'limit':dest.limit,
			}
			arr.push(response);
			arr.push(arr_dest);

			//console.log(arr);
			resolve(arr);
			//var attrib = response.rows[0].elements[0];
			//console.log(parseFloat(attrib.distance.value / 1000).toFixed(2));
			//return parseFloat(attrib.distance.value / 1000).toFixed(2);
				


			//console.log(response.rows[0].elements[0].distance);

			//console.log(response.rows[0].elements[0]);

			//var attrib = response.rows[0].elements
			
			//return parseFloat(attrib.distance.value / 1000).toFixed(2)

			//var attrib = response.rows[0].elements[0]
			//return res.ok("distance en km "+parseFloat(attrib.distance.value / 1000).toFixed(2))
	});

 	});

 	return p;

 	//p.then( (response) => {
 	//console.log(response)
 	//return response;
 	//}).catch( (response) => {
    //return -1;
	//});


};