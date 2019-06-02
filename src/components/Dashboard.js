import { connect } from 'react-redux'
import React, {Component} from 'react'
import QuestionCard from './QuestionCard'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <h3 className='center'>ALL QUESTIONS</h3>
        <ul  >
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <QuestionCard id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionIds : Object.keys(questions)
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
