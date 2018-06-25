import React from 'react'
import { connect } from 'react-redux'

const Leaderboard = ({ users, loading }) => {
  // no need to check for 'loading' state because our <App> does not render the <Router> if data is not loaded
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id} className='user'>
            <img src={user.avatarURL} alt={`Avatar for ${user.name}`} />
            <div>
              <h1>{user.name}</h1>
              <p>{user.polls} Polls</p>
              <p>{user.answers} Answers</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function pollScore(user) {
  return user.polls + user.answers
}

function mapStateToProps({ users }) {
  /*
  TRES IMPORTANT 
  we use mapStateToProps to map the store state
  into the "exact" props that are needed for our component
  */
  const sortedUserd = Object.values(users)
    .map(({ id, name, avatarURL, polls, answers }) => ({
      id,
      name,
      avatarURL,
      polls: polls.length,
      answers: answers.length,
    }))
    .sort((a, b) => pollScore(b) - pollScore(a))
  return {
    users: sortedUserd,
  }
}

export default connect(mapStateToProps)(Leaderboard)

