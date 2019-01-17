module.exports = {
	
	datastores: {	
		default: {
			adapter: 'sails-mysql',
			url: 'mysql://root:@localhost:3306/arz'
		}
	},

	models: {
		migrate: 'alter',
	},

	log: {
    	level: 'debug'
  	},

  	custom: {
    internalEmailAddress: 'pomalianni@gmail.com',
  },


}