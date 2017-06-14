import Globals from '../globals'
import fetch from 'isomorphic-fetch'

class ActionsHelper {
  fetchWithMethod(method, endpoint, beforeRequest, afterRequest, postBody) {
    console.log('Sending ' + method + ' to ' + endpoint + ' with body:')
    console.log(postBody)

    return (dispatch, getState) => {
      beforeRequest(dispatch, getState)
      let config = {
          method: method,
        	headers: new Headers({
            'content-type': 'application/json',
            'Authorization': 'Token ' + getState().loginKey
          })
      }
      if (postBody !== null) {
        config.body = JSON.stringify(postBody)
      }
      return fetch(Globals.BACKEND_URL + endpoint, config)
      .then(response => {
        if (response.status !== 200)  {
          console.error('POST ERROR: Received status ' + response.status + ' from ' + endpoint + ' with body:')
          console.error(response.json())
        }
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
    return this.fetchWithMethod('post', endpoint, beforeRequest, afterRequest, postBody)
  }

  sendGet(endpoint, beforeRequest, afterRequest) {
    return this.fetchWithMethod('get', endpoint, beforeRequest, afterRequest, null)
  }
}

export default (new ActionsHelper())
