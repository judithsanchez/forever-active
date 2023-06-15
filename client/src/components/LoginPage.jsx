import React, { useState } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const auth = useAuth();
  const [username, setUserName] = useState('');

  const login = (e) => {
    e.preventDefault();
    auth.login({ username });
  };

  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      x<h1>Login</h1>
      <form onSubmit={login}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUserName(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
