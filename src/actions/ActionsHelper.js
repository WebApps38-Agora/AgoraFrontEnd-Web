import Globals from '../globals'
import fetch from 'isomorphic-fetch'

class ActionsHelper {
  fetchWithMethod(method, endpoint, isEntireURL, beforeRequest, afterRequest, postBody) {
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
      console.log(endpoint);

      return fetch(trueURL, config)
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(json => {
        afterRequest(dispatch, getState, json)
      })
      .catch(error => {
        console.error(error.message)
      })
    }
  }

  sendPost(endpoint, beforeRequest, afterRequest, postBody) {
    return this.fetchWithMethod('post', endpoint, false, beforeRequest, afterRequest, postBody)
  }

  sendGet(endpoint, beforeRequest, afterRequest) {
    return this.fetchWithMethod('get', endpoint, false, beforeRequest, afterRequest, null)
  }

  sendURLGet(endpoint, beforeRequest, afterRequest) {
    return this.fetchWithMethod('get', endpoint, true, beforeRequest, afterRequest, null)
  }
}

export default (new ActionsHelper())
