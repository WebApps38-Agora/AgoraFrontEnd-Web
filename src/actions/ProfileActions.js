import ActionsHelper from './ActionsHelper'

export const ADD_PROFILE_REQUEST = 'ADD_FACT_REQUEST'
export function addProfileRequest(profile) {
  return {
    type: ADD_PROFILE_REQUEST
  }
}

export const ADD_PROFILE_RESPONSE = 'ADD_PROFILE_RESPONSE'
export function addProfileResponse(profile_id, response) {
  return {
    type: ADD_PROFILE_RESPONSE,
    profile: response
  }
}

export const REQUEST_PROFILE = 'REQUEST_PROFILE'
export function requestProfile() {
  return {
    type: REQUEST_PROFILE
  }
}

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile
  }
}

export function fetchProfile() {
  return ActionsHelper.sendGet('/profiles', (dispatch) => {
    dispatch(requestProfile())
  }, (dispatch, getState, response) => {
    dispatch(receiveProfile(response))
  })
}

export function updateProfile(data) {
  let profile_picture = 'https://graph.facebook.com/' + data.profile.id + '/picture'
  return ActionsHelper.sendPut('/profiles', (dispatch) => {
    dispatch(addProfileRequest(data.profile.id))
  }, (dispatch, getState, response) => {
    dispatch(addProfileResponse(data.profile.id, response))
  }, {
    profile_picture: profile_picture,
    country: data.profile.locale,
    gender: data.profile.gender,
    first_name: data.profile.first_name,
    last_name: data.profile.last_name
  })
}
