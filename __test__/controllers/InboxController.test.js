describe("Inbox controller",()=>{

	describe("Method GET /Inbox",()=>{

		it("It should be response 200 and return a collection",(done)=>{
			app.get('/inbox')
			.set("method","GET")
			.expect('Content-Type', /json/)
			.end((err,resp)=>{
				expect(resp.status).toBe(200);
				expect(resp.body).toBeDefined();
				done();
			})
		});	



		it("It should be return an  empty array, because there are no entries \
			 registered for this date.",(done)=>{
			app.get('/inbox?entry_date=20190124')
			.set("method","GET")
			.expect('Content-Type', /json/)
			.end((err,resp)=>{
				expect(resp.status).toBe(200);
				expect(resp.body).toEqual([]);
				done();
			})
		});	


	});		


	describe("POST /Inbox",()=>{
		it("It should be response 200 and return Json Object ",(done)=>{
			app.post('/inbox')
			.set("method","POST")	
			.send({"target":"Gral. Lamadrid","entry_date":"2019-01-23"})
			.expect('Content-Type', /json/)
			.expect(200, done);
		});	


		it("It should be response 500, will no pass a target. ",(done)=>{
			app.post('/inbox')
			.set("method","POST")	
			.send({"entry_date":"2019-01-23"})
			.expect(500, done);
		});	


		it("It should be response 500, will pass an invalid date format(YYY-MM-DD).",(done)=>{
			app.post('/inbox')
			.set("method","POST")	
			.send({"target":"Santa Rosa La Pampa","entry_date":"29-01-23"})
			.expect(500, done);
		});	


	});		
	
});	