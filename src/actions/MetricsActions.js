import ActionsHelper from './ActionsHelper'

export const REQUEST_METRICS = 'REQUEST_METRICS'
export function requestMetrics(topic, article) {
  return ({
    type: REQUEST_METRICS,
    topic,
    article,
  })
}

export const RECEIVE_METRICS = 'RECEIVE_METRICS'
export function receiveMetrics(topic, article, json) {
  return ({
    type: RECEIVE_METRICS,
    metrics: json,
    topic,
    article,
  })
}

export const RATE_BIAS_REQUEST = 'RATE_BIAS_REQUEST'
export function rateBiasRequest(article) {
  return ({
    type: RATE_BIAS_REQUEST,
    article
  })
}

export const RATE_BIAS_RECEIVE = 'RATE_BIAS_RECEIVE'
export function rateBiasReceive(article, json) {
  return receiveMetrics(article, json)
}

export function fetchMetrics(topic, article) {
  return ActionsHelper.sendGet('/metrics/' + article + '/', (dispatch) => {
    dispatch(requestMetrics(topic, article))
  }, (dispatch, getState, response) => {
    dispatch(receiveMetrics(topic, article, response))
  })
}

export function sendRateBiasRequest(article, bias) {
  return ActionsHelper.sendPost('/metrics/', (dispatch) => {
    dispatch(rateBiasRequest(article))
  }, (dispatch, getState, response) => {
    dispatch(rateBiasReceive(article, response))
  }, {
    article: article,
    bias: bias,
  })
}
