import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/questions';

class Question extends Component {

  onOptionOneClicked = (e) => {
    e.preventDefault();
    const { dispatch, question } = this.props
    const qid = question.id
    const answer = "optionOne"
    dispatch(handleAddQuestionAnswer(qid, answer))
  }

  onOptionTwoClicked = (e) => {
    e.preventDefault();
    const { dispatch, question } = this.props
    const qid = question.id
    const answer = "optionTwo"
    dispatch(handleAddQuestionAnswer(qid, answer))
  }


  render() {
    const { question, author } = this.props

    if (!question) {
      return <p>Loading</p>
    }

    return (
      <div id="center">
        <h5>{author.name} asked:</h5>
        <button type="button" onClick={this.onOptionOneClicked} className="btn btn-outline-primary btn-lg btn-block">{question.optionOne.text}</button>
        <button type="button" onClick={this.onOptionTwoClicked} className="btn btn-outline-primary btn-lg btn-block">{question.optionTwo.text}</button>
      </div>
    )
  }
}

function mapStateToProps({questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  if (question) {
    const author = users[question.author]
    return {
      question,
      author
    }
  }
  else return {
    question,
    author: null
  }
}

export default withRouter(connect(mapStateToProps)(Question))