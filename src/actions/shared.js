import { getInitialData } from '../utils/api.js'
import { receivePolls } from './polls'
import { receiveUsers } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_DATA = 'RECEIVE_DATA'

const AUTHED_ID = 'tylermcginnis' // must be one of the 3 users defined in utils/_DATA.js

// thunk action creator (needs the 'redux middleware' react-thunk to be configured)
export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading()) // before fetching
    getInitialData()
      .then(({ polls, users}) => {
        dispatch(receivePolls(polls))
        dispatch(receiveUsers(users))
        //
        /*
        fake an authentication to our database/server
        (we do as if we did an authent and the server answered with an 'authentificated user id')
        */
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading()) // when fetching is done
      })
  }
}

