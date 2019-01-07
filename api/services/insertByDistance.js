module.exports= {

	sortBydistance : function(distance,office,arr){



	//console.log(office)
	miArr ={
		'code':office.code,
		'storage':office.storage,
		'limit' : office.storage,
		'distance':distance
	}

	//console.log(miArr)



	
	if (arr.length == 0){
	   return arr.push(miArr)
	   	
	}

	var i = 0;
	var pos = 0
	for (code in arr) {
		if (parseFloat(distance)<parseFloat(arr[code].distance)){
			pos = i
			break
		}
		i +=1
	}


	if (i == 0){
		arr = arr.splice(0, 0, miArr);

		
	}

	if (i < arr.length){
		 arr = arr.splice(pos, 0, miArr);
	}

	if (i == arr.length){
		arr = arr.splice(arr.length,0, miArr);
	}

	return arr;
 }

}


