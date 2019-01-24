describe("Office controller",()=>{

	
	describe("Get /offices",()=>{


		it("It should be response 200 and get an Array of Json Object ",(done)=>{
			app.get('/offices')
			.expect('Content-Type', /json/)
			.expect(200, done);
            
		});

		it("Filter by an invalid id, will get an null Object",(done)=>{
			app.get('/offices?id=A1')
			.end((err, resp)=>{
				expect(resp.body).toEqual([]);
				done();
			})
		});


		it("Filter by an invalid property ,",(done)=>{
			app.get('/offices?branch=A1')
			.end((err, resp)=>{
				expect(err).toBeDefined();
				done();
			})
		});


	});

	describe("Method POST",()=>{

		it("It should be response 200 and get Json Object ",(done)=>{
			app.post('/offices')
			.set("method","POST")
			.send({"id":"WH01","city":"Buenos Aires","storage":0,"storage_limit":100})
			.expect('Content-Type', /json/)
			.expect(200, done);
            
		});


		it("It should be response 500 and t ",(done)=>{
			app.post('/offices')
			.set("method","POST")
			.send({"id":"WH01","city":"","storage":0,"storage_limit":100})
			.expect(500,done);

		});

	});	


 	describe("Method PUT",()=>{

/*
		it("'We 'll update an existing office ans will get a 200 and  Json Object ",(done)=>{
			app.post('/offices')
			.set("method","PUT")
			.send({"id":"WH01","storage":90})
			.expect('Content-Type', /json/)
			.end((err,resp)=>{
				console.log(err);
				expect(resp.status).toBe(200);
				//expect(resp.body).toBeDefined();
				done();
		 	})	
		});
*/
		it("We 'll update an non existing office ",(done)=>{
			app.post('/offices')
			.set("method","PUT")
			.send({"id":"","city":"SSAA","storage":0,"storage_limit":100})
			.expect(500,done);
		})	
	});


		describe("Method DELETE",()=>{

/*		it("'We 'll go to delete an existing office ans will get a 200 and  Json Object ",(done)=>{
			app.post('/offices')
			.set("method","DELETE")
			.send({"id":"WH01"})
			.expect('Content-Type', /json/)
			.expect(200,done);

		});
*/
	});

});