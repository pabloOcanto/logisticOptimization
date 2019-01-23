/*
Author: pablo Ocanto
mail:pomalianni@gmail.com
date:2190107
description:'this function return a promise wit the response of the service google-api-distance
endpoint:https://maps.googleapis.com/maps/api/distancematrix'
*/

module.exports=  {


  friendlyName: 'distance Matrix',


  description: '',


  inputs: {
    
    origin:{
      type:'string',
      required:true
    },

    destiny:{
      type:'string',
      required:true
    },

  },


  exits: {

    err:{
      description:'bad request'
    }

  },

  fn: async function(inputs,exits){
     // const timeout = await sleep(2000);
      
      let p = new Promise( (resolve, reject) =>{

      if (!inputs.origin){
        reject('Invalid Request')
      }
      const response =[];
      response.push({
      'target':inputs.destiny,
      'origin':inputs.origin
      });

      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 300) {
          break;
        }
      }

      response['rows']=[];
      response.rows[0]={'elements':[]}
      
      response.rows[0].elements[0]=({
        'distance':{
        "text": (Math.random() * 10000)/1.6 + " mi",
        "value":  Math.random() * 1000000
        },
        'driving':{
        "text": Math.floor(Date.now()/60.000) + " min",
        "value": Date.now()
        },
      });
         resolve (response);
     }); 

    return exits.success(p);

  },



}



  













