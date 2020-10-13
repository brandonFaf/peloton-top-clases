import React, { useState } from 'react';
import authenticate from '../services/authenticate';
const Login = ({ setUser }) => {
  const [password, setPassword] = useState('GLRX!U59iG');
  const [username, setUsername] = useState('brmyers2013@gmail.com');
  const [error, setError] = useState();
  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const login = async () => {
    const userId = await authenticate(username, password).catch(e => {
      setError('there was an error logging in');
    });
    if (userId) {
      localStorage.setItem('userId', userId);
      setUser(userId);
    }
  };
  return (
    <div>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        name='username'
        onChange={handleUsername}
        value={username}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        name='password'
        onChange={handlePassword}
        value={password}
      />
      {error && <div>{error}</div>}
      <button type='button' onClick={login}>
        Submit
      </button>
    </div>
  );
};

export default Login;
