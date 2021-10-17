function getTheDataFiveMinutesCandles() {

    //for (var z = 0; z < 8; z++){
    
      var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1QdKzEuw1En95a00sZ14PrL3ZtrX4akHv02HSXLhVB-0/edit#gid=0";
      var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
      var sheet = spreadsheet.getSheetByName('BTC Data 5 Minute');
    
      var year = sheet.getRange("I1").getValue();
      var month = sheet.getRange("J1").getValue();
      var day = sheet.getRange("K1").getValue();
    
    
      if (day > 1){
        day = day - 1;
        Logger.log('First condition');
      } else{
        if ((month - 1) == 2 && year != 2020){
          day = 28;
          if (month > 1){
            month = month - 1;
          } else {
            year = year - 1;
          }
          Logger.log('Second condition');
        } else if ((month - 1) == 2 && year == 2020){
          day = 29;
           if (month > 1){
            month = month - 1;
          } else {
            year = year - 1;
          }
          Logger.log('Third condition');
        } else if ((month - 1) == 1 || (month - 1) == 3 || (month - 1) == 5 || (month - 1) == 7 || (month - 1) == 8 || (month - 1) == 10 || (month == 12)){
            day = 31;
            if (month > 1){
              month = month - 1;
            } else{
              day = 30;
              //month= month - 1;
              if (month > 1){
                month = month - 1;
              } else {
                month = 12
                year = year - 1;
              }
            }
            Logger.log('Fourth condition');
          } else if ((month - 1) == 2 || (month - 1) == 4 || (month - 1) == 6 || (month - 1) == 8 || (month - 1) == 9 || (month - 1) == 11){
            day = 30;
            if (month > 1){
              month = month - 1;
            } else{
              day = 30;
              //month= month - 1;
              if (month > 1){
                month = month - 1;
              } else {
                month = 12
                year = year - 1;
              }
            }
            Logger.log('Fifth condition');
          } else{
            month = 12;
            year = year - 1;
            day = 31;
            Logger.log('Sixth condition');
          }
      }
    
      Logger.log(year);
      Logger.log(month);
      Logger.log(day);
    //}
    
      
      //sheet.getRange("I1").setValue(year);
      //sheet.getRange("J1").setValue(month);
      //sheet.getRange("K1").setValue(day);
    
      
      var finalURL = "https://api.bittrex.com/v3/markets/BTC-USD/candles/MINUTE_5/historical/"+year+"/"+month+"/"+day;
      
      var startsAt = "";
      var open = "";
      var high = "";
      var low = "";
      var close = "";
      var volume = "";
      var quoteVolume = "";
    
      var finalData = [];
    
      var response = UrlFetchApp.fetch(finalURL);
    
      //Logger.log(response.getContentText());
    
      var responseObject = JSON.parse(response.getContentText());
    
      Logger.log(responseObject[0]);
    
      for (var i = 0; i < responseObject.length; i++){
        startsAt = responseObject[i].startsAt;
        open = responseObject[i].open;
        high = responseObject[i].high;
        low = responseObject[i].low;
        close = responseObject[i].close;
        volume = responseObject[i].volume;
        quoteVolume = responseObject[i].quoteVolume;
    
        finalData.push([startsAt, open, high, low, close, volume, quoteVolume]);
    
      } 
    
        var dataSpreadsheet = sheet.getRange(sheet.getLastRow()+1, 1, finalData.length, 7).setValues(finalData);
    
        Utilities.sleep(500);
      
     // }
    
    }
    
    