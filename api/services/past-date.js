/*
Author: pablo Ocanto
mail:pomalianni@gmail.com
date:2190107
description:'this function return the future date or past date , 
			this depends of the second parameter,
 			if it is true so return future date else past date'
*/

module.exports=function(days){

	const moment = require('moment');
	return moment().subtract('days', days).format("YYYY-MM-DD");
}