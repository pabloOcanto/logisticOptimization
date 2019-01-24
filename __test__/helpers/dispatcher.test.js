const mock = require('sails-mock-models');
const each = require('jest-each');
const current_date = require('../../api/services/today');
const paste_date = require('../../api/services/past-date');

jest.mock('../../api/helpers/distance-matrix');

const offices = [{
	id: 'WH01', city: 'Buenos Aires', storage: 90, storage_limit: 100,
},
					  {
	id: 'WH02', city: 'Rosario', storage: 5, storage_limit: 70,
},
					  {
	id: 'WH03', city: 'Cordoba', storage: 20, storage_limit: 150,
},
					  {
	id: 'WH04', city: 'Trelew', storage: 60, storage_limit: 140,
},
					  {
	id: 'WH05', city: 'Mendoza', storage: 20, storage_limit: 150,
},
					  {
	id: 'WH06', city: 'La Plata', storage: 90, storage_limit: 100,
},
					  {
	id: 'WH07', city: 'San Miguel de Tucuman', storage: 30, storage_limit: 100,
},
					  {
	id: 'WH08', city: 'Mar del Plata', storage: 170, storage_limit: 180,
},
					  {
	id: 'WH09', city: 'Salta', storage: 60, storage_limit: 140,
},
					  {
	id: 'WH10', city: 'Santa Fe', storage: 35, storage_limit: 70,
}];


 describe("we're going to delivery n packages with current date", () => {

	beforeAll(() => {
		mock.mockModel(Offices, 'find', offices);
	});


	test.each([['Gral. Lamadrid',current_date()],
		['Tandil',current_date()],
		['Bahia Blanca',current_date()],
		['Mar del Plata',current_date()],
		['Mar del Plata', current_date()],
		['Mar del Plata', current_date()],
		['La Plata', current_date()]]
		)('target %s date %s, will expect that to be delivery', (target,date,done) => {
		const req  = {};
		req['body']={target:target,entry_date:date};
		sails.helpers.distpacher(req).then((result)=>{
			expect(result.office).toBeDefined();
			expect(result.penaltyCost).toBe(70);
			expect(result.egress_date).toBe(current_date());
			done();

		});
	});

});

describe('we\'re going to delivery n packages with 2 days of delay', () => {
	beforeAll(() => {
		//mock.mockModel(Offices, 'find', offices);
	});

	test.each([['Gral. Lamadrid', paste_date(2)],
		['Tandil', paste_date(2)],
		['Bahia Blanca', paste_date(2)],
		['Mar del Plata', paste_date(2)],
		['Mar del Plata', paste_date(2)],
		['Mar del Plata', paste_date(2)],
		['La Plata', paste_date(2)]])('target %s date %s, will expect that can\'t delivery', (target, date, done) => {
		const req = {};
		req.body = { target, entry_date: date };
		sails.helpers.distpacher(req).then((result) => {
			expect(result.office).toBeNull();
			expect(result.egress_date).toBe('');
			expect(result.penaltyCost).toBe(210);
			done();
		});
	});
});
