import {
  RECEIVE_USERS,
} from '../actions/users'
import {
  ADD_POLL,
} from '../actions/polls'
import {
  ADD_ANSWER,
} from '../actions/answers'

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      }
    case ADD_POLL:
      const poll = action.poll
      const { author } = poll
      const user = state[author]
      return {
        ...state,
        [author]: {
          ...user,
          polls: [ ...user.polls, poll.id ],
        }
      }
    case ADD_ANSWER: {
      const { pollId, authedUser } = action
      const user = state[authedUser]
      return {
        ...state,
        [authedUser]: {
          ...user,
          answers: [ ...user.answers, pollId ],
        }
      }
    }
    default:
      return state
  }
}

