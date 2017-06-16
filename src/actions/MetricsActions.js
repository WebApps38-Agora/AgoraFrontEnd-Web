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
    topic: topic,
    article: article
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
export function rateBiasReceive(topic, article, json) {
  return receiveMetrics(topic, article, json)
}

export function fetchMetrics(topic, article) {
  return ActionsHelper.sendGet('/metrics/' + article + '/', (dispatch) => {
    dispatch(requestMetrics(topic, article))
  }, (dispatch, getState, response) => {
    dispatch(receiveMetrics(topic, article, response))
  })
}

export function sendRateBiasRequest(topic, article, bias) {
  return ActionsHelper.sendPost('/metrics/', (dispatch) => {
    dispatch(rateBiasRequest(article))
  }, (dispatch, getState, response) => {
    console.log("asdawdasasd")
    console.log(response)
    dispatch(rateBiasReceive(topic, article, response))
  }, {
    article: article,
    bias: bias,
  })
}
