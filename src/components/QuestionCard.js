import React, {Component}  from 'react'
import { connect } from 'react-redux'

class QuestionCard extends Component {

  render () {
    const { user, question } = this.props;

    var time = question.timestamp
    var date = new Date(time).toDateString()

    return (<div>
      <p>{user.name}</p>
      <p>{question.optionOne.text}</p>
      <p>{date}</p>
    </div>)
  }
}

function mapStateToProps({users,questions} ,{id})
{
  const question = questions[id]
  const user = users[questions[id].author]
  return {
    user,
    question
  }
}

export default connect(mapStateToProps)(QuestionCard)