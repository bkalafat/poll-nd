import React, { Component, Fragment } from 'react';
import './Dashboard'
import '../App.css';
import Dashboard from './Dashboard';
import  { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Question from './Question';


class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
  return (
    <Router>
        <Fragment>
          <div className="container" >
          <Route path='/' exact component={Dashboard}/>
          <Route path='/question/:id' component={Question}/>
        </div>
        </Fragment>
      </Router>
  );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
