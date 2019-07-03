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

    const optionOneLeft = 100 - optionOneText.length
    const optionTwoLeft = 100 - optionTwoText.length

    if(!user)
    return <Redirect to={{
      pathname: '/login/logout',
      state: { from: this.props.location }
    }}/>
    else
    return (

      <div className="jumbotron" >
        <h5>Ask new question:</h5>
        <h5>Would you rather</h5>
        <form onSubmit={this.handleSubmit} >
          <textarea
            placeholder="Option One?"
            value={optionOneText}
            onChange={this.handleOneChange}
            className='textarea'
            maxLength={100}
          />
          {optionOneLeft < 20 && (
            <div className='question-length'>
              {optionOneLeft}
            </div>
          ) }
          <textarea
            placeholder="Option Two?"
            value={optionTwoText}
            onChange={this.handleTwoChange}
            className='textarea'
            maxLength={100}
          />
          {optionTwoLeft < 20 && (
            <div className='question-length'>
              {optionTwoLeft}
            </div>
          ) }
          <button
            className='btn btn-success'
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