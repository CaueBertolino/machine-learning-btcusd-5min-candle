function getDataFiveMinutesCandles() {

  //Get the sheet to receive the data
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();

  //Class being instanced
  var btcusd = new BTCUSD(sheets);
  
  Logger.log("Script Configuration Checks: ");
  Logger.log("Last execution Date: " + btcusd.getLastExecutionDate());
  Logger.log("Date to be executed: " + btcusd.getDateToBeExecuted());
  Logger.log("Fetching data: ");
  Logger.log("Fetch: " + btcusd.fetchFiveMinCandles());
  Logger.log("Download data to Sheet");
  Logger.log("Download: " + btcusd.updateSheet(btcusd.fetchFiveMinCandles()));
  Logger.log("Execution Finished");

}

