import React, { Component } from 'react'
import ScoreBoard from './ScoreBoard';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class LeaderBoard extends Component {

  isAuthed = () => {
    const { authedUser } = this.props;

    if (typeof authedUser !== 'string' || !authedUser instanceof String || authedUser === null || authedUser === '' || authedUser.length === 0) {
      return false
    }
    return true
  }

  render() {

    if(!this.isAuthed())
    return <Redirect to={{
      pathname: '/login/logout',
      state: { from: this.props.location }
    }}/>

    if (!this.props.userArray) {
      return <div>Loading</div>
    }

    const users = this.props.userArray.sort((a, b) => (
      (b.questions.length + Object.keys(b.answers).length) - (a.questions.length + Object.keys(a.answers).length))
    )

    return (
      <div className="offset-3 col-6">
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              <h3>{index + 1}.</h3>
              <ScoreBoard user={user} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  const userArray = Object.keys(users).map(i => users[i])
  return {
    authedUser,
    userArray
  }
}

export default connect(mapStateToProps)(LeaderBoard)