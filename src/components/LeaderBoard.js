import React, { Component } from 'react'
import ScoreBoard from './ScoreBoard';
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {

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

function mapStateToProps({ users }) {
  const userArray = Object.keys(users).map(i => users[i])
  return {
    userArray
  }
}

export default connect(mapStateToProps)(LeaderBoard)