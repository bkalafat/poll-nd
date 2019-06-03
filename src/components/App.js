import React, { Component } from 'react';
import './Dashboard'
import '../App.css';
import Dashboard from './Dashboard';
import  { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }
  render() {
  return (
    <div className="container" >
      <header >
        <Dashboard />
      </header>
    </div>
  );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
