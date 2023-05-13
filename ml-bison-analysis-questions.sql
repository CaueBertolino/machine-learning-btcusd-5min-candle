UPDATE `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btc_results_analysis_bison` 
SET answer_one = answer
FROM (
  select bigfunctions.eu.ask_bison(
    '''
    Question: Table 1 named btcusd_bittrex_5min_candle contains data for Bitcoin prices for a given exchange. Table 2 named btcusd_arima_bittrex_5min_forecast_results_2 contains results for the Big Query ARIMA model, which runs daily with Bitcoin prices available from Table 1. Table 1 is updated daily. Given the current accurracy of the current model, taking into consideration the real values in Table 1 versus the predicted values in Table 2, what is the best option to buy or sell bitcoin?
    Table 1: `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_bittrex_5min_candle`
    Columns: Timestamp, Open, High, Low, Close, Volume, Quote_Volume
    Table 2: `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_arima_bittrex_5min_forecast_results_2`
    Columns: forecast_timestamp, forcast_value, standard_error, confidence_level, prediction_interval_lower_bound, prediction_interval_upper_bound,  confidence_interval_lower_bound, confidence_interval_upper_bound, timestamp
    Answer: formatted as text
    '''
    ) as answer

) WHERE 1 = 1;

UPDATE `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btc_results_analysis_bison` 
SET answer_two = answer
FROM (
  select bigfunctions.eu.ask_bison(
    '''
    Question: Table 1 named btcusd_bittrex_5min_candle contains data for Bitcoin prices for a given exchange. Table 2 named btcusd_arima_bittrex_5min_forecast_results_2 contains results for the Big Query ARIMA model, which runs daily with Bitcoin prices available from Table 1. Table 1 is updated daily. Given the current accurracy of the current model, taking into consideration the real values in Table 1 versus the predicted values in Table 2, what is the accuracy of the model?
    Table 1: `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_bittrex_5min_candle`
    Columns: Timestamp, Open, High, Low, Close, Volume, Quote_Volume
    Table 2: `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_arima_bittrex_5min_forecast_results_2`
    Columns: forecast_timestamp, forcast_value, standard_error, confidence_level, prediction_interval_lower_bound, prediction_interval_upper_bound,  confidence_interval_lower_bound, confidence_interval_upper_bound, timestamp
    Answer: formatted as text
    '''
    ) as answer

) WHERE 1 = 1;

UPDATE `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btc_results_analysis_bison` 
SET answer_three = answer
FROM (
  select bigfunctions.eu.ask_bison(
    '''
    Question: Table 1 named btcusd_bittrex_5min_candle contains data for Bitcoin prices for a given exchange. Table 2 named btcusd_arima_bittrex_5min_forecast_results_2 contains results for the Big Query ARIMA model, which runs daily with Bitcoin prices available from Table 1. Table 1 is updated daily. Given the current accurracy of the current model, taking into consideration the real values in Table 1 versus the predicted values in Table 2, what is the acurracy of the model to predict trends?
    Table 1: `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_bittrex_5min_candle`
    Columns: Timestamp, Open, High, Low, Close, Volume, Quote_Volume
    Table 2: `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.btcusd_arima_bittrex_5min_forecast_results_2`
    Columns: forecast_timestamp, forcast_value, standard_error, confidence_level, prediction_interval_lower_bound, prediction_interval_upper_bound,  confidence_interval_lower_bound, confidence_interval_upper_bound, timestamp
    Answer: formatted as text
    '''
    ) as answer

) WHERE 1 = 1;