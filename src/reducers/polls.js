import {
  RECEIVE_POLLS,
  ADD_POLL,
} from '../actions/polls'
import {
  ADD_ANSWER,
} from '../actions/answers'

export default function polls(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POLLS: {
      return {
        ...state,
        ...action.polls,
      }
    }
    case ADD_POLL: {
      const poll = action.poll
      return {
        ...state,
        [poll.id]: poll,
      }
    }
    case ADD_ANSWER: {
      const { pollId, answer, authedUser } = action
      const poll = state[pollId]
      const voteKey = `${answer}Votes`
      return {
        ...state,
        [pollId]: {
          ...poll,
          [voteKey]: [ ...poll[voteKey], authedUser ],
        },
      }
    }
    default:
      return state
  }
}

