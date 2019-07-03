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
    this.isAuthed()
    this.setState({
      questionIds: this.props.unansweredIds
    })
  }

  isAuthed = () => {
    const { authedUser } = this.props;

    if (typeof authedUser !== 'string' || !authedUser instanceof String || authedUser === null || authedUser === '' || authedUser.length === 0) {
      return false
    }
    return true
  }

  handleAnswered = () => {
    this.isAuthed()
    this.setState({
      questionIds: this.props.answeredIds
    })
  }

  handleUnanswered = () => {
    this.isAuthed()
    this.setState({
      questionIds: this.props.unansweredIds
    })
  }

  render() {
    if(!this.isAuthed()) {
      return <Redirect to={{
        pathname: '/login/logout',
        state: { from: this.props.location }
      }}/>
    }
    return (
      <div className="offset-3 col-6">
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
