const distance = require("../api/services/distance")
jest.mock('../api/services/distance');

//import * as user from '../user';

expect.extend({
	toBeWithTolerance(result,expected,tolerance){

		console.log(result)
		const limit1 = Math.round(expected - tolerance)
		const limit2 = Math.round(expected + tolerance)
		
		if ((result> limit1) && (result<limit2)){
			return {
				pass : true,
				message: () => `pass with tolerance ${tolerance}`
			}
		}

		return {
		pass : false,
		message: () => `pass no with tolerance ${tolerance} accepted`
		}
	}
});




test("Add div  4 / 2 equals 2", () => {
   //expect.assertions(1);
  const data =  distance('Gral. Lamadrid','Rosario');
  console.log(data);
  //return expect(data).toBeWithTolerance(573,1);
  //expect(distance(['Olavarria'],['Buenos Aires']).toBe(2)
  
})

test("expect to be called ", () => {
//const distance = jest.fn();
//mockFn();
expect(distance).toHaveBeenCalled();
  
})





//describe('Distance Calc on kilometers',()=>{
//	test.each (['Olavarria','Buenos Aires','309'],['Gral. LaMadrid','Buenos Aires','440.67'])(
//		'',
//		(a, b, expected) => {
//    	 expect(distance(a, b)).toBeWithTolerance(expected,0.6);
//    	 done();
// 	})
//});