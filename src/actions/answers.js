import { savePollAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer(authedUser, pollId, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    pollId,
    answer,
  }
}

export function handleAddAnswer(id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return savePollAnswer({ authedUser, id, answer })
      .then(() => dispatch(addAnswer(authedUser, id, answer)))
      .then(() => dispatch(hideLoading()))
  }
}

