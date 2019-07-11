import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleAddQuestionAnswer } from '../actions/questions';
import { Redirect } from 'react-router-dom'

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

  isAuthed = () => {
    const { authedUser } = this.props;

    if (typeof authedUser !== 'string' || !authedUser instanceof String || authedUser === null || authedUser === '' || authedUser.length === 0) {
      return false
    }
    return true
  }


  render() {

    const { authedUser, question, author } = this.props

    if (!this.isAuthed()) {
      return <Redirect to={{
        pathname: '/login/logout',
        state: { from: this.props.location }
      }} />
    }

    if (!question) {
      return <Redirect to='/notFound'/>
    }

    const isOptionOneSelected = question.optionOne.votes.includes(authedUser);
    const isOptionTwoSelected = question.optionTwo.votes.includes(authedUser);
    const disabled = isOptionOneSelected || isOptionTwoSelected;

    const optionOneVotesLength = question.optionOne.votes.length
    const optionTwoVotesLength = question.optionTwo.votes.length;
    const totalVotesLength = optionOneVotesLength + optionTwoVotesLength

    const optionOneText = disabled ? question.optionOne.text + ' %' + (optionOneVotesLength / totalVotesLength) * 100 + ' (' + optionOneVotesLength + ' out of ' + totalVotesLength + ' votes)' : question.optionOne.text
    const optionTwoText = disabled ? question.optionTwo.text + ' %' + (optionTwoVotesLength / totalVotesLength) * 100 + ' (' + optionTwoVotesLength + ' out of ' + totalVotesLength + ' votes)' : question.optionTwo.text

    const buttonOneType = !disabled ? 'btn-outline-primary' : isOptionOneSelected ? 'btn-outline-success' : 'btn-outline-secondary'
    const buttonTwoType = !disabled ? 'btn-outline-primary' : isOptionTwoSelected ? 'btn-outline-success' : 'btn-outline-secondary'

    return (
      <div id="center">
        <h5>{author.name} asked: Would You Rather</h5>
        <button disabled={disabled} type="button" onClick={this.onOptionOneClicked} className={'btn  btn-lg btn-block ' + buttonOneType}>{optionOneText}</button>
        <button disabled={disabled} type="button" onClick={this.onOptionTwoClicked} className={'btn  btn-lg btn-block ' + buttonTwoType}>{optionTwoText}</button>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  if (question) {
    const author = users[question.author]
    return {
      question,
      author,
      authedUser
    }
  }
  else return {
    question,
    author: null,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(Question))