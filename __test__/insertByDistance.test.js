const insertByDistance = require("../api/services/insertByDistance")

let arrOffices = [
    {
		'code':'WH01',
		'city': 'Buenos Aires Buenos Aires ',
		'storage':0,
		'limit':'200'
	},

	{
		'code':'WH02',
		'city': 'Rosario Santa Fe',
		'storage':0,
		'limit':'70'
	},


	{
		'code':'WH03',
		'city': 'Cordoba Cordoba',
		'storage':0,
		'limit':'150'
	},]

/*	{
		'code':'WH04',
		'city': 'Trelew Chubut',
		'storage':0,
		'limit':'140'
	},

	{
		'code':'WH05',
		'city': 'Mendoza Mendoza ',
		'storage':0,
		'limit':'150'
	},


	{
		'code':'WH06',
		'city': 'La Plata Buenos Aires ',
		'storage':0,
		'limit':'100'
	},

	{
		'code':'WH07',
		'city': 'San Miguel Tucuman ',
		'storage':0,
		'limit':'120'
	},



	{
		'code':'WH08',
		'city': 'Mar del Plata Buenos Aires ',
		'storage':0,
		'limit':'180'
	},


	{
		'code':'WH09',
		'city': 'Salta Salta ',
		'storage':0,
		'limit':'140'
	},

	{
		'code':'WH10',
		'city': 'Santa Fe Santa Fe ',
		'storage':0,
		'limit':'70'
	},


] */


//var package = {
//	'target' :'Gral La Madrid Buenos Aires',
//	'entry_date':'2019-01-05',
//	'status' : 'undelivered'
//}


//var distance =[489.32,370.17,670.12,1189.12,1300.12,470.12,1000.00,320.31,1430.12,970.21]

var distance =[489.32,370.17,670.12]
var i =0;
var orderedArray = [];

test("Order Array by distance between to origin city", () => {

  for ( off in arrOffices){
  	insertByDistance.sortBydistance(distance[i],arrOffices[off],orderedArray);
  	i +=1;
  }
  expect(orderedArray[0].distance).toBe(370.17);
  expect(orderedArray[1].distance).toBe(489.32);
  expect(orderedArray[2].distance).toBe(670.12);
  expect(orderedArray[0].code).toMatch('WH02');
  expect(orderedArray[1].code).toMatch('WH01');
  expect(orderedArray[2].code).toMatch('WH03');
  
})