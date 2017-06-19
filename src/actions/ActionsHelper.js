import Globals from '../globals'
import fetch from 'isomorphic-fetch'

class ActionsHelper {
  fetchWithMethod(method, endpoint, isEntireURL, beforeRequest, afterRequest, errorHandler, postBody) {
    console.log('Sending ' + method + ' to ' + endpoint + ' with body:')
    console.log(postBody)

    return (dispatch, getState) => {
      beforeRequest(dispatch, getState)

      let config = {
          method: method,
        	headers: new Headers({
            'content-type': 'application/json',
          })
      }

      if (postBody !== null) {
        config.body = JSON.stringify(postBody)
      }

      if (getState().loginKey) {
        config.headers.append('Authorization', 'Token ' + getState().loginKey)
      }

      let trueURL = ((isEntireURL) ? "" : Globals.BACKEND_URL) + endpoint;

      return fetch(trueURL, config)
      .then(response => {
        return response.json()
      })
      .then(json => {
        afterRequest(dispatch, getState, json)
      })
      .catch(error => {
        errorHandler(dispatch, getState, error)
      })
    }
  }

  defErrorHandler(d, g, error) {
    console.error(error.message);
  }

  sendPost(endpoint, beforeRequest, afterRequest, postBody, errorHandler = this.defErrorHandler) {
    return this.fetchWithMethod('post', endpoint, false, beforeRequest, afterRequest, errorHandler, postBody)
  }

  sendPut(endpoint, beforeRequest, afterRequest, postBody, errorHandler = this.defErrorHandler) {
    return this.fetchWithMethod('put', endpoint, false, beforeRequest, afterRequest, errorHandler, postBody)
  }

  sendGet(endpoint, beforeRequest, afterRequest, errorHandler = this.defErrorHandler) {
    return this.fetchWithMethod('get', endpoint, false, beforeRequest, afterRequest, errorHandler, null)
  }

  sendURLGet(endpoint, beforeRequest, afterRequest, errorHandler = this.defErrorHandler) {
    return this.fetchWithMethod('get', endpoint, true, beforeRequest, afterRequest, errorHandler, null)
  }
}

export default (new ActionsHelper())
