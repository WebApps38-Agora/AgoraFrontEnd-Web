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

export const RECEIVE_CURRENT_PROFILE = 'RECEIVE_CURRENT_PROFILE'
export function receiveCurrentProfile(profile) {
  return {
    type: RECEIVE_CURRENT_PROFILE,
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

export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS'
export function requestNotifications() {
  return {
    type: REQUEST_NOTIFICATIONS
  }
}

export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS'
export function receiveNotifications(json) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications: json.results
  }
}

export const REQUEST_MARK_NOTIFICATION_SEEN = 'REQUEST_MARK_NOTIFICATION_SEEN'
export function requestMarkNotificationSeen() {
  return {
    type: REQUEST_MARK_NOTIFICATION_SEEN
  }
}

export const RECEIVE_MARK_NOTIFICATION_SEEN = 'RECEIVE_MARK_NOTIFICATION_SEEN'
export function receiveMarkNotificationSeen(json) {
  return {
    type: RECEIVE_MARK_NOTIFICATION_SEEN,
  }
}


export function fetchUserProfile(profile_id) {
  return ActionsHelper.sendGet(`/profiles/${profile_id}/`, (dispatch) => {
    dispatch(requestProfile())
  }, (dispatch, getState, response) => {
    dispatch(receiveProfile(response))
  }, (dispatch, getState, error) => {
    dispatch(handleProfileError(error))
  })
}

export function fetchNotifications() {
  return ActionsHelper.sendGet('/notifications/', (dispatch) => {
    dispatch(requestNotifications())
  }, (dispatch, getState, response) => {
    dispatch(receiveNotifications(response))
  }, (dispatch, getState, error) => {
    dispatch(handleProfileError(error))
  })
}

export function markNotificationSeen(id) {
  return ActionsHelper.sendGet(`/notifications/${id}/seen/`, (dispatch) => {
    dispatch(requestMarkNotificationSeen())
  }, (dispatch, getState, response) => {
    dispatch(receiveMarkNotificationSeen(response))
  }, (dispatch, getState, error) => {
    dispatch(handleProfileError(error))
  })
}

export function fetchCurrentProfile() {
  return ActionsHelper.sendGet('/profiles/', (dispatch) => {
    dispatch(requestProfile())
  }, (dispatch, getState, response) => {
    dispatch(receiveCurrentProfile(response))
    dispatch(fetchNotifications())
  }, (dispatch, getState, error) => {
    dispatch(handleProfileError(error))
  })
}

export function fetchProfileIfLoggedIn() {
  return (dispatch, getState) => {
    if (getState().loginKey) {
      dispatch(fetchCurrentProfile())
    }
  }
}

export function updateProfile(data, myProfileId) {
  let profile_picture = 'https://graph.facebook.com/' + data.profile.id + '/picture?type=large'
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
