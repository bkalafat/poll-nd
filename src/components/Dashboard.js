import { connect } from 'react-redux'
import React, { Component } from 'react'
import QuestionCard from './QuestionCard'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.handleAnswered = this.handleAnswered.bind(this)
    this.handleUnanswered = this.handleUnanswered.bind(this)
    this.state = {
      questionIds: this.props.unansweredIds
    };
  }

  componentDidMount() {
    //TODO: bkalafat set state after got initial data.
    this.setState({
      questionIds: this.props.unansweredIds
    })
  }

  handleAnswered = () => {
    this.setState({
      questionIds: this.props.answeredIds
    })
  }

  handleUnanswered = () => {
    this.setState({
      questionIds: this.props.unansweredIds
    })
  }

  render() {

    const {authedUser} = this.props;

    if(!authedUser)
    {
      return <Redirect to='/login/logout' />
    }

    return (
      <div  className="offset-3 col-6">
        <div className="btn-group" role="group" >
          <button type="button" onClick={this.handleUnanswered.bind(this)} className="btn btn-secondary">Unanswered Questions</button>
          <button type="button" onClick={this.handleAnswered.bind(this)} className="btn btn-secondary">Answered Questions</button>
        </div>
        <ul>
          {this.state.questionIds.map((id) => (
            <li key={id}>
              <QuestionCard id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {
  return {
    unansweredIds: Object.keys(questions)
      .filter(x => !questions[x].optionOne.votes.includes(authedUser) && !questions[x].optionTwo.votes.includes(authedUser))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredIds: Object.keys(questions)
      .filter(x => questions[x].optionOne.votes.includes(authedUser) || questions[x].optionTwo.votes.includes(authedUser))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
      authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)
