module.exports = {


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


  fn: async function (inputs,exits) {
    require('dotenv').config();
    var sails = require('sails');
    var distance=require('google-distance-matrix');
    distance.key(process.env.API_KEY);
    distance.mode('driving');
    distance.units('imperial');
    var origin = []
    origin.push(inputs.origin)
    var destination = [];
    destination.push(inputs.destiny);


    let p = new Promise( (resolve, reject) => {

     distance.matrix(origin, destination, function (err, response) {
        console.log(response);
      if (err){
        reject('Bad request');
      }
      resolve(response);
      });
    });

    return exits.success(p)

  },

}  

