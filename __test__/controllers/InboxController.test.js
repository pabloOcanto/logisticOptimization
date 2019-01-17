describe("Inbox controller",()=>{
	describe("POST /Inbox",()=>{
		it("It should be response 200 and get Json Object ",(done)=>{
			app.post('/inbox')
			.set("method","POST")
			.set('content-type','text/plain')
			.send({"target":"Gral. Lamadrid","entry_date":"20190117"})
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(200, done);
			done();
            
		});

	});	

	describe("POST /inbox",()=>{

		it("No targer entry, should be return a 500,",(done)=>{
			app.post('/inbox')
			.set("method","POST")
			.send({target:'',entry_date:'20190117'})
			.expect(500,done);
			done();
		});

	});
	

});	