import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import userActions from '../actions/user';


const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const user = bindActionCreators(userActions, dispatch)

  const handleLogin = (event) => {
    event.preventDefault()
    user.login({
      username: username,
      loggedIn: true,
    })
    dispatch(push('/loggedin'))
  }

  const handleChangeNickname = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <input onChange={handleChangeNickname} type="text" value={username} />
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default Login
