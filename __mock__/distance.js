module.exports =jest.fn(origin,destination){
		var responses = [ {
	   "destination_addresses" : [ "Rosario" ],
	   "origin_addresses" : [ "Gral. Lamadrid" ],
	   "rows" : [
	      {
	         "elements" : [
	            {
	               "distance" : {
	                  "text" : "357 mi",
	                  "value" : 573884
	               },
	               "duration" : {
	                  "text" : "7 h 2 min",
	                  "value" : 25337
	               },
	               "status" : "OK"
	            }
	         ]
	      }
	   ],
	   "status" : "OK"
		}];

	}

	return responses[0].rows[0].elements.distance.value;


	if (responses[0].destination_addresses == 'Rosario' && responses[0].origin_addresses == 'Gral. Lamadrid' ){
		return responses[0].rows[0].elements.distance.value
	}
}


