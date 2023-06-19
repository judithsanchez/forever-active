import React, { useState } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function SignUp() {
  const auth = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const signup = (e) => {
    e.preventDefault();
    auth.signup(username, password);
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
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">Sign Up</button>
        {auth.signupResponse && auth.signupResponse.status === 400 && (
          <p>
            Oops! It seems that the username is already taken. Try a different
            one!
          </p>
        )}
      </form>
    </>
  );
}
