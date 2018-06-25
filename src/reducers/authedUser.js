import {
  SET_AUTHED_USER
} from '../actions/authedUser'

// our state is just a 'userId string' if we are authent or null if we are not authent yet
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id
    default:
      return state
  }
}

