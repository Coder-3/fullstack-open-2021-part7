import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  width: 100%;
  color: dimgray;
  overflow: auto;
  border-bottom: 1px solid dimgray;
`

const NavLink = styled(Link)`
  padding-left: 15px;
  text-decoration: none;
  color: dimgray;

  @media only screen and (min-width: 600px) {
    padding-left: 30px;
  }
`

const LoginStatus = styled.div`
  margin-left: auto;
  padding-right: 15px;

  @media only screen and (min-width: 600px) {
    padding-right: 30px;
  }
`

const UserLoggedIn = styled.span`
  margin-right: 15px;

  @media only screen and (min-width: 600px) {
    margin-right: 30px;
  }
`

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <NavBar>
      <NavLink to="/">blogs</NavLink>
      <NavLink to="/users">users</NavLink>
      {user !== null ?
        <LoginStatus>
          <UserLoggedIn>{user.name} logged in</UserLoggedIn>
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </LoginStatus>
        :
        <LoginStatus>
          Please login
        </LoginStatus>
      }
    </NavBar>
  )
}

export default Navigation