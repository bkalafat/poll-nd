import React, {Component} from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class Question extends Component {
  render() {
    const {question, author} = this.props


    if(!question) {
      return <p>Loading</p>
    }

    return(
    <div>
      <div>{author.name} asked:</div>
      <div>{question.optionOne.text}</div>
      <div>{question.optionTwo.text}</div>
    </div>
    )
  }
}

function mapStateToProps({questions, users}, props) {
  const {id} = props.match.params
  const question = questions[id]
  if(question) {
    const author = users[question.author]
    return {
      question,
      author
    }
  }
}

export default withRouter(connect(mapStateToProps)(Question))