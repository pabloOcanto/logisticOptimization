describe('Inbox Model', () => {
	it('Inbox method find', ((done) => {
		Inbox.find({}).exec((err, list) => {
    	expect(list).toBeDefined();
    	done();
		});
	}));


	it('Inbox, missing entry_date parameter, and not will be created ', ((done) => {
		Inbox.create({ target: 'La Madrid' }).exec((err, list) => {
    	expect(err).toBeDefined();
    	expect(list).toBeUndefined();
    	done();
		});
	}));


	it('A new Inbox should be created', ((done) => {
		const data = {target: 'Olavarria', entry_date: '20190112' };
		Inbox.create(data).exec((err, list) => {
	    console.log(err);	
	    expect(list).toBeUndefined();
	    expect(err).toBeUndefined();
    	done();
		});
	}));
});
