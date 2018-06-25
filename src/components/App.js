import React, { Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import AddPoll from './AddPoll'
import Poll from './Poll'

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  render() {
    const { loading } = this.props
    let element = null
    if (!loading) {
      element = (
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/add' component={AddPoll} />
          <Route path='/polls/:pollId' component={Poll} /> {/* url parameter :pollId will be available in props.match.params.pollId */}
          <Route render={() => {
            return <p>Not Found</p>
          }}/>
        </Switch>
      )
    }
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {element}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  // a null state.authedUser means we are in the 'loading' state
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App)

