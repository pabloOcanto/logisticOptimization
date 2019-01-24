const fecha = require('../../api/services/today');
describe("Test today function , We 'll expect that return the current date",()=>{
	it('the data is peanut butter', () => {
		const x = fecha();
		expect(x).toBe('2019-01-24'); //replace by the current date.

	});

});
