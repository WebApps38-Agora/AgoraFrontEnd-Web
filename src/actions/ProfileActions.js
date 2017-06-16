import ActionsHelper from './ActionsHelper'

export const ADD_PROFILE_REQUEST = 'ADD_FACT_REQUEST'
export function addProfileRequest(profile) {
  return {
    type: ADD_PROFILE_REQUEST
  }
}

export const ADD_PROFILE_WARNING = 'ADD_PROFILE_WARNING'
export function addProfileWarning() {
  return {
    type: ADD_PROFILE_WARNING
  }
}

export const REMOVE_PROFILE_WARNING = 'REMOVE_PROFILE_WARNING'
export function removeProfileWarning(topic, content) {
  return {
    type: REMOVE_PROFILE_WARNING
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

export const HANDLE_PROFILE_ERROR = 'HANDLE_PROFILE_ERROR'
export function handleProfileError(error) {
  return {
    type: HANDLE_PROFILE_ERROR,
    error
  }
}

export function fetchProfile() {
  return ActionsHelper.sendGet('/profiles', (dispatch) => {
    dispatch(requestProfile())
  }, (dispatch, getState, response) => {
    dispatch(receiveProfile(response))
  }, (dispatch, getState, error) => {
    dispatch(handleProfileError(error))
  })
}

export function fetchProfileIfLoggedIn() {
  return (dispatch, getState) => {
    if (getState().loginKey) {
      dispatch(fetchProfile())
    }
  }
}

export function updateProfile(data, myProfileId) {
  let profile_picture = 'https://graph.facebook.com/' + data.profile.id + '/picture'
  return ActionsHelper.sendPut('/profiles/update_own_profile/',
     (dispatch, getState) => {
    dispatch(addProfileRequest(myProfileId))
  }, (dispatch, getState, response) => {
    dispatch(addProfileResponse(myProfileId, response))
  }, {
    profile_picture: profile_picture,
    country: data.profile.locale,
    gender: data.profile.gender,
    first_name: data.profile.first_name,
    last_name: data.profile.last_name,
  })
}
