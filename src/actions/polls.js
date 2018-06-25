import { savePoll } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  }
}

function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  }
}

export function handleAddPoll(poll) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    poll.author = authedUser
    dispatch(showLoading()) // display a progress bar because the UI will only be updated once we get a response from the DB
    return savePoll({ 
      ...poll,
      author: authedUser, // add the currently logged author to the poll object generated in <AddPoll>
    })
      .then(poll => {
        dispatch(addPoll(poll))
      })
      .then(() => dispatch(hideLoading())) // notify the user that the UI contains the new poll (so we hide the progress bar)

  }
}

