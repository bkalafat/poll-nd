import React, { Component, Fragment } from 'react';
import './Dashboard'
import '../App.css';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Question from './Question'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Login from './Login'
import LeaderBoard from './LeaderBoard';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const {authedUser} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav IsAuthed={authedUser !== null} />
            {this.props.loading === true
              ? null
              :
              <div className='text-center' >
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' component={Question} />
                <Route path='/new' component={NewQuestion} />
                <Route path='/login' component={Login} />
                <Route path='/leaderboard' component={LeaderBoard} />
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    loading: questions === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
