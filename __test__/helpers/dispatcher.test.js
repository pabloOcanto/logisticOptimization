const mock = require('sails-mock-models');
const each = require('jest-each');

jest.mock('../../api/helpers/distance-matrix');
describe('Missure efficient of dispatch algoritm ', () => {
	beforeAll(() => {
		const temporal = {};
		const inbox = {};
		const offices = [{
			'code': 'WH01', city: 'Buenos Aires', 'storage': 10, 'storage_limit': 100,
		},
					  {
			'code': 'WH02', city: 'Rosario', 'storage': 5, 'storage_limit': 70,
		},
					  {
			'code': 'WH03', city: 'Cordoba', 'storage': 20, 'storage_limit': 150,
		},
					  {
			'code': 'WH04', city: 'Trelew', 'storage': 60, 'storage_limit': 140,
		},
					  {
			'code': 'WH05', city: 'Mendoza', 'storage': 20, 'storage_limit': 150,
		},
					  {
			'code': 'WH06', city: 'La Plata', 'storage': 90, 'storage_limit': 100,
		},
					  {
			'code': 'WH07', city: 'San Miguel de Tucuman', 'storage': 30, 'storage_limit': 100,
		},
					  {
			'code': 'WH08', city: 'Mar del Plata', 'storage': 170, 'storage_limit': 180,
		},
					  {
			'code': 'WH09', city: 'Salta', 'storage': 60, 'storage_limit': 140,
		},
					  {
			'code': 'WH10', city: 'Santa Fe', 'storage': 35, 'storage_limit': 70,
		}];
		mock.mockModel(Offices, 'find', offices);
		mock.mockModel(Inbox, 'create', {});

	});	

	test.each([['Gral. Lamadrid', '20190117'],
		['Tandil', '20190117'],
		['Bahia Blanca', '20190116'],
		['Mar del Plata', '20190117'],
		['Mar del Plata', '20190117'],
		['Rosario', '20190117'],
		['Mar del Plata', '20190113'],
		['La Plata', '20190117'],
		['Mar del Plata', '20190117'],
		['Mar del Plata', '20190117'],
		['Bahia Blanca', '20190117'],
		['Bahia Blanca', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Mar del Plata', '20190117'],
		['Mar del Plata', '20190117'],
		['Bahia Blanca', '20190117'],
		['Bahia Blanca', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Mar del Plata', '20190117'],
		['Mar del Plata', '20190117'],
		['Bahia Blanca', '20190117'],
		['Bahia Blanca', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Mar del Plata', '20190117'],
		['Mar del Plata', '20190117'],
		['Bahia Blanca', '20190117'],
		['Bahia Blanca', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],
		['Puerto Madryn', '20190117'],


	])('target %s date %s', (target,date,done) => {
		const dispatcher =require('../../api/helpers/distpacher');
		const inbox  = {target:target,entry_date:date}
		const dispatcher = dispatcher(inbox);
			if (dispatcher){
				const off_code = parseInt(result.office.substring(2,4));
	 			offices[off_code].storage_limit -=1
	 			mock.mockModel(Offices, 'update', offices);
	 			expect(offices[off_code].storage_limit).toGreaterThan(0);
	 			done();
			}
		});


	});	



