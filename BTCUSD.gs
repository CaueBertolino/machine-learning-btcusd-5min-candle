//Class constructor
class BTCUSD {
    constructor(sheets) {
      
  
      /*
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /                                                                                                                                                                     /
      / Class construction configuration                                                                                                                                    /
      /                                                                                                                                                                     /
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      */
  
      //Set current time
      this.today = Utilities.formatDate(new Date(), "GTM+1", "YYYY-MM-dd");
  
      //Set API end point
      this.apiEndPoint = "https://api.bittrex.com/v3/markets/BTC-USD/candles/MINUTE_5/historical/";
  
      // Check if the required "BTC Data 5 Minute" sheet exists
      this.sheet = false;
      for (var i = 0; i < sheets.length; i++){
        if(sheets[i].getName() == "BTC Data 5 Minute"){
          this.sheet = sheets[i];
        }
      }
      
      /*
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /                                                                                                                                                                     /
      / Functions & Methods                                                                                                                                                 /
      /                                                                                                                                                                     /
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      */
  
  
      // Function: getSheetName
      // Return sheet name if exists
      this.getSheetName = !this.sheet ? "Sheet Not Found" : function(){ 
  
        return this.sheet.getName();
  
      }
  
      // Function: getLastExecutionDate
      // Get the date of the last execution from the sheet
      this.getLastExecutionDate = !this.sheet ? "Sheet Not Found" : function(){      
        
        var year = this.sheet.getRange("I1").getValue();
        var month = this.sheet.getRange("J1").getValue();
        var day = this.sheet.getRange("K1").getValue();
  
        //Check if the last execution date is available and of the info provided is valid
        var lastExecutionDate = "";
  
        if (year != "" && month != "" && day != ""){    
          
          lastExecutionDate = year + "-" + month + "-" + day;
          //Logger.log(lastExecutionDate);
          if(lastExecutionDate){
  
            //format result
            return lastExecutionDate.substring(0, 4) + "/" + lastExecutionDate.substring(5, 7) + "/" + lastExecutionDate.substring(8, 10);
  
          } else {
  
            return "Invalid date";
  
          }
  
        } else {
          
          return "Date not configured correctly";
  
        }
  
      }
  
      // Function: getDateToBeExecuted
      // Get the date of the last execution from the sheet
      this.getDateToBeExecuted = function(){ 
        
        if(!this.sheet || this.getLastExecutionDate() == "Invalid date" || this.getLastExecutionDate() == "Date not configured correctly"){
  
          return this.today.substring(0, 4) + "/" + this.today.substring(5, 7) + "/" + (parseInt(this.today.substring(8, 10) - 1));
  
        } else {
          
          return this.getLastExecutionDate().substring(0, 4) + "/" + this.getLastExecutionDate().substring(5, 7) + "/" + ((parseInt(this.getLastExecutionDate().substring(8, 10)) + 1) > 9 ? (parseInt(this.getLastExecutionDate().substring(8, 10)) + 1) : "0" + (parseInt(this.getLastExecutionDate().substring(8, 10)) + 1));
  
        }
  
  
      }
  
      // Function: fetchFiveMinCandles
      // Get the date of the last execution from the sheet
      this.fetchFiveMinCandles = function(){
        //Logger.log(isNaN(this.getDateToBeExecuted()));     
  
        var checkDateLast = new Date(this.getDateToBeExecuted());
        var checkDateNow = new Date(this.today);
  
        if (checkDateLast >= checkDateNow){
          return "Not possible to fetch data";
        }
  
        var finalURL = this.apiEndPoint + this.getDateToBeExecuted();
        Logger.log(finalURL);
  
        
  
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
  
        //Logger.log(responseObject[0]);
  
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
  
        return finalData;
  
      }
  
      // Function: updateSheet
      // Update data to the sheet & next execution
      this.updateSheet = function (data){
        
        if(data != "Not possible to fetch data"){
  
          //Download the data to the sheet
          var dataToSpreadsheet = this.sheet.getRange(this.sheet.getLastRow()+1, 1, data.length, 7).setValues(data);
  
          // Update the sheet with the last date executed
          var dateExecuted = this.getDateToBeExecuted();
          this.sheet.getRange("I1").setValue(dateExecuted.substring(0, 4));
          this.sheet.getRange("J1").setValue(dateExecuted.substring(5, 7));
          this.sheet.getRange("K1").setValue(dateExecuted.substring(8, 10));
  
          return "Data downloaded for " + dateExecuted;
  
        } else {
  
          return "No data to download.";
  
        }
      }
  
  
  
      
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  