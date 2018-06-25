import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink exact activeClassName='active' to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/leaderboard'>Leaderboard</NavLink>
        </li>
        <li>
          <NavLink activeClassName='active' to='/add'>Add Poll</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

