import React from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/answers'
import { getPercentage } from '../utils/helpers'


const getVoteKeys = () => [ 'a', 'b', 'c', 'd' ]

class Poll extends React.Component {
  handleAnswer = voteKey => {
    const { dispatch, poll } = this.props
    /*
    if we only check props.poll !== null to know if the poll is already answered
    the user can click on several answers before the redux store is updated with our answer
    so if the user clicks very quickly then handleAnswer() can be called multiple times
    so we use this.answered to prevent multiple clicks
    */
    this.answered = true
    dispatch(handleAddAnswer(poll.id, voteKey))
  }
  render() {
    const { poll, vote, authorAvatar } = this.props
    if (!poll)
      return (<p>This poll does not exist</p>)
    const totalVotes = getVoteKeys().reduce((total, voteKey) => total + poll[`${voteKey}Votes`].length, 0)
    return (
      <div className='poll-container'>
        <h1 className='question'>{poll.question}</h1>
        <div className='poll-author'>
          By <img src={authorAvatar} alt='Avatar for poll author' />
        </div>
        <ul>
          {getVoteKeys().map(voteKey => {
            /*
            if the poll is not answered we only render the question
            otherwise we render the poll results per question (resultElement)
            */
            const questionVotes = poll[`${voteKey}Votes`].length
            const question = poll[`${voteKey}Text`]
            const resultElement = (
              <div className='result'>
                <span>{question}</span>
                <span>{getPercentage(questionVotes, totalVotes)}% ({questionVotes})</span>
              </div>
            )
            const className = `option ${voteKey === vote ? 'chosen' : ''}` // we use any JS expression inside a 'string template'
            return (
              <li
                key={voteKey}
                className={className}
                onClick={() => !vote && !this.answered && this.handleAnswer(voteKey)}
              >
                {vote ? resultElement : question}
              </li>
            )})}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, polls }, ownProps) {
  const pollId = ownProps.match.params.pollId // retrieve url parameter
  const poll = polls[pollId]
  if (!poll) {
    return {
      poll: null,
    }
  }
  /*
  to know if the user already answered this poll (and if so to know its answer)
  look for a 'authedUser' in poll.xVotes arrays (with x in getVoteKeys() array)
  */
  const vote = getVoteKeys().reduce((vote, voteKey) => poll[`${voteKey}Votes`].includes(authedUser) ? voteKey : vote, null)
  return {
    poll,
    vote,
    authedUser,
    authorAvatar: users[poll.author].avatarURL,
  }
}

export default connect(mapStateToProps)(Poll)

