import React, { Component, Fragment } from 'react';
import './Dashboard'
import '../App.css';
import Dashboard from './Dashboard';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Question from './Question'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import Login from './Login'
import LeaderBoard from './LeaderBoard';
import NoMatch from './NoMatch';




class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  isAuthed = () => {
    const { authedUser } = this.props;

    if (typeof authedUser !== 'string' || !authedUser instanceof String || authedUser === null || authedUser === '' || authedUser.length === 0) {
      return false
    }
    return true
  }

  render() {

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav user={this.props.user} IsAuthed={this.isAuthed()} />
            {this.props.loading === true
              ? null
              :
              <div className='text-center' >
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' component={Question} />
                  <Route path='/add' component={NewQuestion} />
                  <Route path='/login' component={Login} />
                  <Route path='/leaderboard' component={LeaderBoard} />
                  <Route component={NoMatch} />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}




function mapStateToProps({ users, questions, authedUser }) {

  const user = users[authedUser]

  return {
    loading: questions === null,
    authedUser,
    user
  }
}

export default connect(mapStateToProps)(App)
