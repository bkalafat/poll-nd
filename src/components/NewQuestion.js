import React, {Component} from 'react'
import { connect } from 'react-redux'
import {handleAddQuestion} from '../actions/questions'
import {Redirect} from 'react-router-dom'

class NewQuestion extends Component {

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleOneChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText : optionOneText
    }))
  }

  handleTwoChange = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText : optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {optionOneText, optionTwoText} = this.state
    const {dispatch} = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    console.log('New Question: ', optionOneText)

    this.setState(() => ({
      optionOneText:'',
      optionTwoText:'',
      toHome: true
    }))

  }


  render() {
    const { user } = this.props;
    const {optionOneText, optionTwoText, toHome} = this.state

    if (toHome === true) {
      return <Redirect to='/'/>
    }

    const optionOneLeft = 280 - optionOneText.length
    const optionTwoLeft = 280 - optionTwoText.length

    if(!user)
    return ('Loading')
    else
    return (

      <div className="jumbotron" >
        <h5><img className="img-thumbnail col-8 col-sm-8 col-md-6 col-lg-4" src={user.avatarURL} alt={`Avatar of ${user.name}`} /> {user.name} asks:</h5>
        <h5>Would you rather</h5>
        <form onSubmit={this.handleSubmit} >
          <textarea
            placeholder="Option One?"
            value={optionOneText}
            onChange={this.handleOneChange}
            className='textarea'
            maxLength={280}
          />
          {optionOneLeft < 100 && (
            <div className='question-length'>
              {optionOneLeft}
            </div>
          ) }
          <textarea
            placeholder="Option Two?"
            value={optionTwoText}
            onChange={this.handleTwoChange}
            className='textarea'
            maxLength={280}
          />
          {optionTwoLeft < 100 && (
            <div className='question-length'>
              {optionTwoLeft}
            </div>
          ) }
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === '' }>
              Submit
          </button>
        </form>
      </div>)
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser]
  return {
    user: user ? user : null
  }
}

export default connect(mapStateToProps)(NewQuestion)