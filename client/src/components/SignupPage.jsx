import React, { useState } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const auth = useAuth();
  const [username, setUserName] = useState('');

  const signup = (e) => {
    e.preventDefault();
    auth.signup(username);
  };

  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <h1>Sign-up!</h1>
      <form onSubmit={signup}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUserName(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
