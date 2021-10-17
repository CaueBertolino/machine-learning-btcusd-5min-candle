#Linear Regression 
CREATE OR REPLACE MODEL `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min_model`
OPTIONS
  (model_type='linear_reg',
    input_label_cols=['average']) AS
SELECT
  datetime,
  open,
  high,
  low,
  close,
  average
FROM
  `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min`;


#evaluate
SELECT
  *
FROM
  ML.EVALUATE(MODEL `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min_model`,(
  SELECT
  datetime,
  open,
  high,
  low,
  close,
  average
FROM
  `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min`));


# predict
SELECT
  predicted_average
FROM
  ML.PREDICT(MODEL `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min_model`,(
  SELECT
  datetime,
  open,
  high,
  low,
  close,
  average
FROM
  `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min` ));


#predict 2

SELECT datetime, predicted_average FROM ML.PREDICT(MODEL `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min_model`, (
    SELECT datetime, open, low, high, close, average FROM `cryptocurrency-predictor.BYBIT_BTCUSD_5MIN.bybit_btcusd_5min`
    WHERE datetime BETWEEN '2021-03-10' AND  '2021-03-10 23:59:59'
    ORDER BY datetime DESC
));