# Bitcoin price predictor using Arima model in Big Query GCP

This project was made as a proof of concept of the possibility to use the <a href="https://cloud.google.com/bigquery-ml/docs/arima-single-time-series-forecasting-tutorial" target="_blank">Arima model available in Big Query GCP</a> to predict Bitcoin price in dolars.

Using <a href="https://developers.google.com/apps-script/guides/sheets" target="_blank">Google Scripts (Google Sheets - Spreadsheet Service)</a> I wrote a code that runs everyday at 10am Ireland's time to fetch "yesterday's" data for Bitcoin prices from the <a href="https://bittrex.github.io/api/v3" target="_blank"> Bittrex API</a> and update the sheet with Bitcoin figures. The information retrieved from the API are: open, close, lowest, and highest figures for 5 minutes candles of the day before.

The idea to use 5 minutes candles was to understand what would be the results using the most volatile data possible. Testing on other types of time frames are still due to be done.

The sheet was then imported into <a href="https://cloud.google.com/bigquery" target="_blank"> Big Query</a> as a table using the native integration the Google products offers. Any updates to the sheet reflects immediatelly in Big Query.

I wrote a simple <a href="https://cloud.google.com/bigquery-ml/docs/arima-single-time-series-forecasting-tutorial" target="_blank">Arima model available in Big Query GCP</a> using SQL to run every day at 11am Ireland's time, including the last day's (yesterday) data into the model to predict the next 288 "5 mins close values" (the number of 5 minutes in 24h). The code then returns the predicted close values for the current day. This model takes about (at the time of this project implementation) 45 minutes to run. 

The results for the prediction can be found on this <a href="https://datastudio.google.com/reporting/137eeb38-e1ca-4a93-91b4-22a888ef4b14/page/p_dfyxv1z8nc" target="_blank">Dashboard</a>. The dashboard plots the results predicted and also plots a comparison of predicted data vs actual data.

Improvements to be made:
- Change the API to one that offers different time frames for the candles and data more frequently updated. The Bittrex API (at the time of this project implementation) presented some bugs for fetching some time ranges or more recent data.
- Once the data for the intraday is available, run the code more frequently. It would be interesting to understand how much accurate would the model be if instead of predicting the next 24 hours the prediction was changed to every 6 hours trying to predict the next 6 hours, including the intraday information.
- Include other time ranges for candles (like 6h, 12h, 1 day) and predict these values that tend to be more stable.
- Try other cryptocurrencies or non-crypto currencies (forex).
- Try to use the same idea in stocks or more stable markets.
- Once happy with the results, use them in a Bot to automatically trade.

Links:

Sheet: https://docs.google.com/spreadsheets/d/1QdKzEuw1En95a00sZ14PrL3ZtrX4akHv02HSXLhVB-0/edit#gid=0

Dashboard: https://datastudio.google.com/reporting/137eeb38-e1ca-4a93-91b4-22a888ef4b14/page/p_dfyxv1z8nc



---------------------------------------------------------------------------------------------------------
Updates: 09-05-2022

Something changed in the Big Query's ARIMA model on the 28th of March of 2022. You will be able to check it by yourself in this very same dashboard.
I suggest selecting the range: 2022-03-26 to 2022-03-31. The change, as you can see, happened on the 28th.

I failed to find the answer in any of <a href="https://cloud.google.com/support/docs/community"> Google's documentation.</a>

I posted a question on <a href="https://stackoverflow.com/questions/72177282/bigquery-arima-model-what-changed"> Stackoverflow </a> and another one in the <a href="https://www.googlecloudcommunity.com/gc/AI-ML/BigQuery-ARIMA-Model-What-changed/m-p/421507#M318"> GCP Community </a>


