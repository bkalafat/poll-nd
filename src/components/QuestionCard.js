import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class QuestionCard extends Component {

  render() {
    const { user, question } = this.props;

    return (
      <div className="jumbotron" >
        <h5><img className="img-thumbnail col-8 col-sm-8 col-md-6 col-lg-4" src={user.avatarURL} alt={`Avatar of ${user.name}`} /> {user.name} asks:</h5>
        <h5>Would you rather</h5>
        <p >{question.optionOne.text}</p>
        <Link to={`/question/${question.id}`} className="btn btn-primary btn-sm" role="button">View Poll</Link>
      </div>)
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id]
  const user = users[questions[id].author]
  return {
    user,
    question
  }
}

export default connect(mapStateToProps)(QuestionCard)