import Globals from '../globals'
import fetch from 'isomorphic-fetch'

class ActionsHelper {
  sendPost(endpoint, beforeRequest, afterRequest, postBody) {
    console.log('Sending POST to ' + endpoint + ' with body:')
    console.log(postBody)

    return (dispatch, getState) => {
      beforeRequest(dispatch, getState)

      return fetch(Globals.BACKEND_URL + endpoint, {
          method: 'post',
        	headers: new Headers({'content-type': 'application/json'}),
          body: postBody
      })
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
        console.error(error.statusText)
      })
    }
  }

  sendGetWithBody(endpoint, beforeRequest, afterRequest, postBody) {
    console.log('Sending GET to ' + endpoint + ' with body:')
    console.log(postBody)

    return (dispatch, getState) => {
      beforeRequest(dispatch, getState)

      return fetch(Globals.BACKEND_URL + endpoint, {
          method: 'get',
        	headers: new Headers({'content-type': 'application/json'}),
          body: postBody
      })
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
        console.error(error.statusText)
      })
    }
  }


  sendGet(endpoint, beforeRequest, afterRequest) {
    return this.sendGetWithBody(endpoint, beforeRequest, afterRequest, {})
  }
}

export default (new ActionsHelper())
