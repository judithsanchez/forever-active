import React, { useState } from 'react';
import { useAuth } from './auth';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  const auth = useAuth();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    auth.login(username, password);
  };

  if (auth.user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUserName(e.target.value)} />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
