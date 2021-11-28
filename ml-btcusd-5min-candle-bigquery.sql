#Create Model
CREATE OR REPLACE MODEL BYBIT_BTCUSD_5MIN.btcusd_bittrex_arima_model
OPTIONS
  (model_type = 'ARIMA_PLUS',
   time_series_timestamp_col = 'Timestamp',
   time_series_data_col = 'Close',
   auto_arima = TRUE,
   data_frequency = 'AUTO_FREQUENCY',
   decompose_time_series = TRUE
  ) AS
SELECT
  Timestamp, Close
FROM
  `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_bittrex_5min_candle`
GROUP BY Timestamp, Close;

#Forecast & insert into table 
INSERT INTO `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_arima_bittrex_5min_forecast_results_2`
SELECT
 *
FROM
 ML.FORECAST(MODEL BYBIT_BTCUSD_5MIN.btcusd_bittrex_arima_model,
             STRUCT(288 AS horizon, 0.9 AS confidence_level))
