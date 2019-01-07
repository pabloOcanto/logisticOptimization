/*
Author: pablo Ocanto
mail:pomalianni@gmail.com
date:2190107
description:'this function return the current  date*/

module.exports=function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 

	var yyyy = today.getFullYear();
	if (dd < 10) {
  		dd = '0' + dd;
	} 
	if (mm < 10) {
  	mm = '0' + mm;
	}

	return  yyyy + mm + dd

}