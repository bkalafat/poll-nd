import { connect } from 'react-redux'
import React, {Component} from 'react'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <h3 className='center'>DASHBOARD</h3>
        <ul  >
          {this.props.questionIds.map((id) => (
            <li key={id}>
              <p>{id}</p>
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
