import { combineReducers } from 'redux'
import polls from './polls'
import users from './users'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  polls,
  users,
  authedUser,
  loadingBar: loadingBarReducer,
})

