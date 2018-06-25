import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const FilterButton = ({ selected, onClick, children }) => {
  const style = { textDecoration: selected ? 'underline' : null }
  return <button style={style} onClick={onClick}>{children}</button>
}

class Dashboard extends React.Component {
  state = {
    showAnswered: false, // IMPORTANT: this state is not used anywhere else in our app, so we must not put it in our redux store
  }
  handleUnanswered = () => {
    this.setState(() => ({ showAnswered: false }))
  }
  handleAnswered = () => {
    this.setState(() => ({ showAnswered: true }))
  }
  render() {
    // no need to check for 'loading' state because our <App> does not render the <Router> if data is not loaded
    const { showAnswered } = this.state
    const { answered, unanswered } = this.props
    const polls = showAnswered ? answered : unanswered
    return (
      <div>
        <div className='dashboard-toggle'>
          <FilterButton selected={!showAnswered} onClick={this.handleUnanswered}>Unanswered</FilterButton>
          <span> | </span>
          <FilterButton selected={showAnswered} onClick={this.handleAnswered}>Answered</FilterButton>
        </div>
        <ul className='dashboard-list'>
          {polls.map(poll => (
            <li key={poll.id}>
              <Link to={`/polls/${poll.id}`}>{poll.question}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, polls, users }) {
  /*
  <App> remains 'loading' until our redux store is filled with the initial data
  so here we know that our store is not empty (autheUser is not null, ...)
  */
  const answers = users[authedUser].answers // each user contains an array of the answered poll ids
  const answered = answers.map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp) // sort by timestamp
  const unanswered = Object.keys(polls)
    .filter(id => !answers.includes(id))
    .map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp)
  return {
    answered,
    unanswered,
  }
}


export default connect(mapStateToProps)(Dashboard)

