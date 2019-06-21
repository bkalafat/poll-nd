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


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              :
              <div>
                <Route path='/' exact component={Dashboard} />
                <Route path='/question/:id' component={Question} />
                <Route path='/new' component={NewQuestion} />
              </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
