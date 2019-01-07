module.exports={

 read : function(file){
	var path ='./data/'
  path +=file
	var XLSX = require('xlsx');
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    var data = [];

    sheet_name_list.forEach(function(y) {
      var worksheet = workbook.Sheets[y];
      var headers = {};

      for(z in worksheet) {
          if(z[0] === '!') continue;
          var tt = 0;
          for (var i = 0; i < z.length; i++) {
              if (!isNaN(z[i])) {
                  tt = i;
                  break;
              }
          };
          var col = z.substring(0,tt);
          var row = parseInt(z.substring(tt));
          var value = worksheet[z].v;

          //store header names
          if(row == 1 && value) {
              headers[col] = value;
              continue;
          }

          if(!data[row]) data[row]={};
          data[row][headers[col]] = value;
      }

      data.shift();
      data.shift();       
    });

    return data;

  }

 } 