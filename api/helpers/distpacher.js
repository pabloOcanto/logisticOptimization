module.exports = {


	friendlyName: 'distpacher',


	description: 'This object will be used like a helper \
                with the final purpose to decide wich branch office will be assigned',

	inputs: {
		req: {
			type: 'ref',
			description: 'The current incoming request (req).',
			required: true,
		},
	},


	exits: {

		err: {
			description: 'something was wrong',
		},

	},


	async fn(inputs, exits) {
		const moment = require('moment');
		const current_date = require('../services/today');

		const inbox = { target: inputs.req.body.target, entry_date: inputs.req.body.entry_date, status: 'undelivered' };

		let today = current_date();
		let entry_date = inbox.entry_date;
		today = moment(today);
		entry_date = moment(entry_date);
		inbox.egress_date = current_date();
		inbox.penaltyCost = today.diff(entry_date, 'days') * 70;
		inbox.penaltyCost += 70;
		inbox.penaltyCost = parseInt(inbox.penaltyCost);
/*
 
  Author:pablo ocanto
  date:20190117
  Email:pomalianni@gmial.com
  description:'This section calculate the distance of delivery 
  between the destination and  each city of our warehouse and  
  will storage into ordered temporal array by distance with respect 
  to the destiny of the delivery'.

  BEGIN

*/	
  	const offices = await Offices.find({});

		const tempArr = [];
		for (i in offices) {
			const response = await sails.helpers.distanceMatrix(inbox.target, offices[i].city);
			if (response) {
				const attrib = response.rows[0].elements[0];
				const distance = parseFloat(attrib.distance.value / 1000).toFixed(2);

				const temporal = {
					target: inbox.target,
					warehouse: offices[i].id,
					current_storage: offices[i].storage,
					current_limte: offices[i].storage_limit,
					distance,
				};


				if (tempArr.length === 0) {
					tempArr.push(temporal);
					continue;
				}

				let pos = 0;
				for (var i = 0; i < tempArr.length; i += 1) {
					if (tempArr[i].distance >= temporal.distance) {
						pos = i;
						break;
					}
				}

				tempArr.splice(pos, 0, temporal);
			}
		};

/*
  END
*/  

/*
 
  Author:pablo ocanto
  date:20190117
  Email:pomalianni@gmial.com
  description:'This section check if it necesary to delivery nearby city 
               when the warehouse reach the ninety-five percent of its storage.
               and not overcome the delivery cost.'
               delviry cost = 5km travelled plus seventy dollar for each day of delay.

  BEGIN

*/  

		for (i in tempArr) {
			const limit_alert = (((tempArr[i].current_storage + 1) * 100) / tempArr[i].current_limte).toFixed(2);
			const deliveryCost = Math.round(tempArr[i].distance / 5);
			const penaltyCost = inbox.penaltyCost;

			if (limit_alert >= 95) {
				continue;
			}

			if (deliveryCost >= penaltyCost) {
				tempArr[i].current_storage = parseInt(tempArr[i].current_storage) + 1;
				warehouse = tempArr[i].warehouse;
				inbox.office = warehouse;
				inbox.status = 'delivered';
				tempArr[i].current_storage += 1;

				const update = await Offices.updateOne({ id: tempArr[i].warehouse }).set({ storage: tempArr[i].current_storage });
				if (!update) {
					throw ("Couldn\'t update the storage");
				}
				break;
			}
		}


/*
  Author:pablo ocanto
  date:20190117
  Email:pomalianni@gmial.com
  description:'This section check if the new entry was not assigned , 
                so it will assigned to nearby city, when only  not overcome 
                the delivery cost.
                delviry cost = 5km travelled plus seventy dollar for each day of delay.
                         

  BEGIN

*/  

		if (inbox.status === 'undelivered') {
			for (i in tempArr) {
				const deliveryCost = Math.round(tempArr[i].distance / 5);
				const penaltyCost = inbox.penaltyCost;

				if (deliveryCost >= penaltyCost) {
					tempArr[i].current_storage = parseInt(tempArr[i].current_storage) + 1;
					warehouse = tempArr[i].warehouse;
					inbox.office = warehouse;
					inbox.status = 'delivered';
					tempArr[i].current_storage += 1;
					const offUpdate = Offices.updateOne({ id: tempArr[i].warehouse }).set({ storage: tempArr[i].current_storage });
					if (!update) {
						throw ('Couldn\'t update the storage');
					}
					break;
				}
			}
		}


  /*

    END

  */  


		if (typeof inbox.office === 'undelivered') {
			inbox.egress_date = '';
		}

		console.log('create entry + ', inbox);

		const entry = await Inbox.create(inbox).fetch();

		return exits.success(entry);
	},

};
