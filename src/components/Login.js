import React, { useState } from 'react';
import authenticate from '../services/authenticate';
const Login = ({ setUser }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const login = async e => {
    e.preventDefault();
    setLoading('Loading...');
    setError('');
    const userId = await authenticate(username, password).catch(e => {
      setError('there was an error logging in');
    });
    if (userId) {
      localStorage.setItem('userId', userId);
      setUser(userId);
    } else {
      setError(
        'Could not find user. Please make sure email and password are correct'
      );
      setLoading('');
    }
  };
  return (
    <form>
      <label htmlFor='username'>Username:</label>
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
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>{loading}</div>}
      <button type='submit' onClick={login}>
        Submit
      </button>
    </form>
  );
};

export default Login;
