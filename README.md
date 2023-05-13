# Bitcoin price predictor using Arima model in Big Query GCP

This open source project was made as a proof of concept of the possibility to use the <a href="https://cloud.google.com/bigquery-ml/docs/arima-single-time-series-forecasting-tutorial" target="_blank">Arima model available in Big Query GCP</a> to predict Bitcoin price in dolars.

Using <a href="https://developers.google.com/apps-script/guides/sheets" target="_blank">Google Scripts (Google Sheets - Spreadsheet Service)</a> I wrote a code that runs everyday at 10am Ireland's time to fetch "yesterday's" data for Bitcoin prices from the <a href="https://bittrex.github.io/api/v3" target="_blank"> Bittrex API</a> and update the sheet with Bitcoin figures. The information retrieved from the API are: open, close, lowest, and highest figures for 5 minutes candles of the day before.

The idea to use 5 minutes candles was to understand what would be the results using the most volatile data possible. Testing on other types of time frames are still due to be done.

The sheet was then imported into <a href="https://cloud.google.com/bigquery" target="_blank"> Big Query</a> as a table using the native integration the Google products offers. Any updates to the sheet reflects immediatelly in Big Query.

I wrote a simple <a href="https://cloud.google.com/bigquery-ml/docs/arima-single-time-series-forecasting-tutorial" target="_blank">Arima model available in Big Query GCP</a> using SQL to run every day at 11am Ireland's time, including the last day's (yesterday) data into the model to predict the next 288 "5 mins close values" (the number of 5 minutes in 24h). The code then returns the predicted close values for the current day. 

I am also using <a href="https://github.com/unytics/bigfunctions">BigFunctions</a> to write another query using the PaLM 2 (Bison) model to answer the following questions (using the real results and forecasted tables as data sources):
- What is the best option to buy or sell bitcoin?
- What is the accuracy of the model?
- What is the accuracy of the model to predict trends?

I then created a simple <a href= "https://lookerstudio.google.com/u/0/navigation/reporting" target="_blank">Looker Studio</a> dashboard to include the results for the prediction and the answers from the Large Language Model. The results can be found on this <a href="https://datastudio.google.com/reporting/137eeb38-e1ca-4a93-91b4-22a888ef4b14/page/p_dfyxv1z8nc" target="_blank">Dashboard</a>.

This ia an open source project, fell free to contribute.

Links:

Sheet: https://docs.google.com/spreadsheets/d/1QdKzEuw1En95a00sZ14PrL3ZtrX4akHv02HSXLhVB-0/edit#gid=0

Dashboard: https://datastudio.google.com/reporting/137eeb38-e1ca-4a93-91b4-22a888ef4b14/page/p_dfyxv1z8nc
