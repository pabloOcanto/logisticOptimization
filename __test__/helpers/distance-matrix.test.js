 require('dotenv').config();
 var distance=require('google-distance-matrix');
 
describe("distance-matrix helper",()=>{

	describe("We 'll calculate the distance in km between two know cities\
		La Plata , Mar del Plata", ()=>{

			it("We 'll expect that the distance be 369.9 km \
				according to google",(done)=>{
				distance.key(process.env.API_KEY); //replace for the api key of google maps
 				distance.mode('driving');
		    	distance.units('imperial');
 				origin = ['La Plata'];
 				destiny = ['Mar del Plata'];

 				distance.matrix(origin, destiny, function (err, response) {
 					const atrb =response.rows[0].elements[0];
 					const km = parseFloat(atrb.distance.value / 1000).toFixed(1);
 					expect(km).toBe("369.9");
 					expect(response).toBeDefined();
 					done();
 					
			});

		});	


	
	});

});