describe("Office controller",()=>{
	describe("Get /offices",()=>{

		it("It should be response 200 and get Json Object ",(done)=>{
			app.get('/offices')
			.expect('Content-Type', /json/)
			.expect(200, done);
            
		});

		it("Filter by an invalid id,",(done)=>{
			app.get('/office?id=')
			.expect(500,done);
		});

	});

	describe("Method POST",()=>{

		it("It should be response 200 and get Json Object ",(done)=>{
			app.post('/offices')
			.expect('Content-Type', /json/)
			.expect(200, done);
            
		});

		it("Filter by an invalid id,",(done)=>{
			app.get('/office?id=')
			.expect(500,done);
		});

	});

});	