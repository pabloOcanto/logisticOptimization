# Logistic Optimization 

#The this development goal, consist to delivery packages in argentina that it came from all around the world with an efficient delivery 
#This development is done over Sails Js
#The schema of database you can find insinde the folder "ARZ_LOGISTIC/data/Db" ,import it into of mysql db
#It the same way you can find the diagram of class inside the folder ARZ_LOGISTIC/data/Uml , it file was done with startUml tool, to see it open the filw with this tool.

# Folders

#The schema of database you can find insinde the folder "ARZ_LOGISTIC/data/Db" ,import it into of mysql db
#It the same way you can find the diagram of class inside the folder ARZ_LOGISTIC/data/Uml , it file was done with startUml tool, to see it open the filw with this tool.


# Api rest
#This section describe all api rest method for this aplication
#first run the server localy with the next command "sails lift"
#the endpoint is is localhost:1337/
#add name of the model, example "Inbox or Office" followed by slash, operation name
#operation name
	#create
	#update
	#delete
#example localhost:1337/logistic/rest/create

#get
#Only get method, allow parameters by url the rest of them not can't or the service will fail

# Running test cases
#1st you must create a file named ".env" in the root folder of the project
#and set the propertie API_KEY  , with your api key of google, if you have not an 
#api key read the following link:
#https://developers.google.com/maps/documentation/distance-matrix/intro
#then type in node console the following comand npm test
#if you want to see the percent of code coverage , 
#type npm test:coverage in the node console , it 'll generate a reporte 
#inside the folder named "coverage".  


