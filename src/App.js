import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Data from './components/Data';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser(userId);
    }
  }, []);
  if (!user) {
    return <Login setUser={setUser} />;
  }
  return <Data setUser={setUser} userId={user} />;
}

export default App;
