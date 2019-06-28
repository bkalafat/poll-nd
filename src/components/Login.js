import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    authedUser: null,
    toHome: false
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const { authedUser } = this.state
    const { dispatch } = this.props
    dispatch(setAuthedUser(authedUser))
    console.log('User Id: ', authedUser)
    this.setState(() => ({
      authedUser,
      toHome: true
    }))
  }

  handleChange = (e) => {
    const authedUser = e.value

    this.setState(() => ({
      authedUser
    }))
  }

  render() {
    const { dispatch } = this.props

    const pathname = this.props.location.pathname
    if (pathname === '/login/logout' && !this.state.toHome) {
      dispatch(setAuthedUser(null))
    }
    else {
      return <Redirect to='/' />
    }

    //TODO bkalafat: Get user ids from api.
    const options = [
      { value: 'karamba61', label: 'Burak' },
      { value: 'tarkan', label: 'Tarkan' },
      { value: 'kupton', label: 'Kate Upton' },
    ];

    return (
      <div className="offset-3 col-6">
        <form onSubmit={this.handleSubmit} >
          <Select
            onChange={this.handleChange}
            options={options}
          />
          <button className='btn btn-success' type='submit'>
            Login
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Login)