/*
Author: pablo Ocanto
mail:pomalianni@gmail.com
date:2190107
description:'this function return a promise wit the response of the service google-api-distance
endpoint:https://maps.googleapis.com/maps/api/distancematrix'
*/

module.exports=jest.fn((origin,office)=>{

   let p = new Promise( (resolve, reject) =>{

      if (!origin){
        reject('Invalid Request')
      }
      const response =[];
      response.push({
      'target':office.code,
      'origin':origin,
      });
    
      response['rows']=[];
      response.rows[0]={'elements':[]}
      
      response.rows[0].elements[0]=({
        'distance':{
        "text":"212 mi",
        "value":Math.random() * 1000
        },
      });
        response.push(office);
         resolve (response);
     });  

      return p;
     
}); 