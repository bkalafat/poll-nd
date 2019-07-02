import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav(props) {

  if (!props.IsAuthed) {
    return (
      <nav className='nav navbar navbar-inverse' >
        <ul className="nav navbar-nav" />
        <ul className="nav navbar-nav navbar-right">
          <li><NavLink to={'/login/login'} activeClassName='active'>Login</NavLink></li>
        </ul>
      </nav>
    )
  }

  return (
    <nav className='nav navbar navbar-inverse'>
      <ul className="nav navbar-nav">
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><img className="img-thumbnail col-4 col-sm-4 col-md-3 col-lg-2" src={props.user.avatarURL} alt={`Avatar of ${props.user.name}`} />{props.user.name}</li>
        <li><NavLink to={'/login/logout'} activeClassName='active'>Log out</NavLink></li>
      </ul>
    </nav>
  )
}