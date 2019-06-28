import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav(props) {
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
        <li><NavLink to={`/login/${props.IsAuthed ? 'logout' : 'login' }`} activeClassName='active'>{props.IsAuthed ? `Log Out` : `Login`}</NavLink></li>
      </ul>
    </nav>
  )
}