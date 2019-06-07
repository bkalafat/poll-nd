import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/questions';

class Question extends Component {

  onOptionClicked = (e) => {
    e.preventDefault();
    const { dispatch, authedUser, question } = this.props
    const qid = question.id
    const answer = e.target.value === "optionTwo" ? "optionTwo" : "optionOne"
    dispatch(handleAddQuestionAnswer({authedUser, qid, answer}))
  }


  render() {
    const { question, author } = this.props

    if (!question) {
      return <p>Loading</p>
    }

    return (
      <div id="center">
        <h5>{author.name} asked:</h5>
        <button type="button" value="optionOne" onClick={this.onOptionClicked} className="btn btn-outline-primary btn-lg btn-block">{question.optionOne.text}</button>
        <button type="button" value="optionTwo" onClick={this.onOptionClicked} className="btn btn-outline-primary btn-lg btn-block">{question.optionTwo.text}</button>
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  if (question) {
    const author = users[question.author]
    return {
      authedUser,
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