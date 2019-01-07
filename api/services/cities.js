module.exports = {

	attributes: { 
	cities :{}

	},

    putCity: function(key, item) { 
     cities[key] = item; 
    }, 
    getCity: function(key) { 
     return cities[key]; 
    },

    getAll:function(){
    	if (cities.size() == 0) {
			Offices.find().exec(function(err,list){
				list.forEach(function(city){
				cities.putCity(city.id,city)
				})
			})
		}

	}	
    
}


