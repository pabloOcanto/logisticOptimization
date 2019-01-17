module.exports = {
	
	datastores: {	
		default: {
			adpter:'sails-disk',
			inMemoryOnly:false,
		}
	},

	models: {
		migrate: 'drop',
	},

	log: {
    	level: 'debug'
  	},

  	custom: {
    internalEmailAddress: 'pomalianni@gmail.com',
  },


}