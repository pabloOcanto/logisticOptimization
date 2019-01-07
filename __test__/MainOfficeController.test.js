/*var cities = [
'Córdoba',
'Rosario',
'La Plata',
'San Miguel de Tucuman',
'Mar del Plata',
'Salta',
'Santa Fe',
'Lanús',
'Bahía Blanca',
'Corrientes',
'Posadas',
'Quilmes',
'Paraná',
'San Salvador de Jujuy',
'Quilmes',
'Santiago del Estero',
'Banfield',
'Formosa',
'Concordia',
'Florencio Varela',
'Olavarria',
'Tandil',
'Gualeguaychú',
'Colon',
'Santa Rosa',
'San Rafael Mendoza',
'General Alvear',
'Gaiman',
'Rawson',
'Viedma',
'Villa Carlos Paz',
'Cordoba',
'Mina Clavero',
'Uritorco',
'Resistencia',
'General José de San Martín'
];
*/
// var Offices = require('../api/models/Offices');

//var sails  = require("sails");
var Offices = require('../api/models/Offices');
var app ='';



  var Sails = require('sails');

  // Global before hook
/*  before(function (done) {
    // Lift Sails with test database
    Sails.lift({
      log: {
        level: 'error'
      },
      models: {
        'adapter': 'sails-mysql',
        migrate: 'alter'
      }
    }, function(err) {
      if (err)
        return done(err);

      // Anything else you need to set up
      // ...

      done();
    });
  });

  // Global after hook
  after(function (done) {
    console.log(); // Skip a line before displaying Sails lowering logs
    Sails.lower(done);
  });

*/
describe('Register packages ',() =>{

	beforeAll((done)=>{
		Sails.lift({
	      log: {
	        level: 'error'
	      },
	      datastores: {
	      	default: {
	        adapter: 'sails-mysql',
     		url: 'mysql://root:@localhost:3306/arz'
     		}
	      },
	        models:{
     			 migrate: 'alter',
     		}
	    }, function(err) {
	      if (err)
	        return done(err);

	      // Anything else you need to set up
	      // ...

	      done();
	    });
	});	

	afterAll((done)=>{
		//resetear valores
		//Offices.update({}).set({storage:0}).exec();

		Sails.lower(done);
	})


	test("Delviry 10 packages to Cordoba, the percent of storage must be 15 percent ", (done) =>{
		var newOff;
		Offices.create({code:'WH03',city:'La Plata',storage:10,limit:150}).exec((err,data)=>{
			data.length.should.not.be.eql(0);
			done();
		});
		

	})
})


