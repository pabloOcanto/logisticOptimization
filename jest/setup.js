const sails = require('sails');
const distance=require('google-distance-matrix');
const request = require('supertest');


beforeAll((done)=> {
  sails.lift({
  	datastores: {	
		default: {
			adpter:'sails-disk',
			inMemoryOnly:false,
		}
	},

	models: {
		migrate: 'drop',
	},


  }, err => {
  	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
  	global.app = request(sails.hooks.http.app);
    done(err, sails);
  });
});

afterAll(sails.lower);